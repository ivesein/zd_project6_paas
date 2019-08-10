SceneJS.setConfigs({
    pluginPath: "./plugins"
});
const serverHost = 'http://192.168.96.9:8080/bimserverwar/';
require.config({
    paths: {
        'BimServerClient': serverHost + '/apps/bimserverjavascriptapi/bimserverapi.js?_v=0.0.121',
        // 'BimServerClient':http://192.168.96.9:8080/bimserverwar/apps/bimserverjavascriptapi/bimserverapi.js?_v=%VERSION%
    }
});

const Global = {
    models: {}
};

const Config = {
    userName: "644253643@qq.com",
    password: "123456",
    projectName: "test1"
};
$(function() {
    function login(userName, password, success, fail) {
        if (Global.bimServerApi && Global.user === undefined) {
            Global.bimServerApi.login(userName, password, function() {
                Global.bimServerApi.resolveUser(function(user) {
                    Global.user = user;
                    setTimeout(function() {
                        if (typeof success == 'function') {
                            success();
                        }
                    }, 0);
                });
            }, function(e) {
                if (fail && typeof fail == 'function') {
                    fail(e);
                }
                console.log(e);
            });
        }
    }

    function loadScene() {
        Global.viewer = new BIMSURFER.Viewer(Global.bimServerApi, 'viewport');
        Global.viewer.loadScene(() => {
            Global.scene = Global.viewer.scene;
            Global.clickSelect = Global.viewer.getControl("BIMSURFER.Control.ClickSelect");
            Global.clickSelect.activate();
            Global.bimServerApi.callWithNoIndication("ServiceInterface", "getProjectsByName", { name: Config.projectName }, function(data) {
                if (data && data.length > 0) {
                    Global.currentProject = data[0];
                    loadModel();
                }
            });
        }, {
            useCapture: true,
        });
    }

    function loadTree(model) {
        let tree = document.getElementById("tree")
            //格式化tree数据
        let data = {};
        for (let key1 in model.loadedTypes) {
            if (!($.isEmptyObject(model.loadedTypes[key1])) && key1 !== "IfcProject" && key1 !== "IfcSite" && key1 !== "IfcBuilding" && key1 !== "IfcBuildingStorey" && key1 !== "IfcSpace" && key1 !== "IfcPresentationLayerAssignment" && key1 !== "IfcSIUnit" && key1 !== "IfcProductDefinitionShape") {
                for (let key2 in model.loadedTypes[key1]) {
                    let typeName = model.loadedTypes[key1][key2].getType();
                    let typeMark = model.loadedTypes[key1][key2].object._rContainedInStructure && model.loadedTypes[key1][key2].object._rContainedInStructure[0]
                    if (typeMark) {
                        for (let key3 in model.loadedTypes.IfcBuildingStorey) {
                            let type = model.loadedTypes.IfcBuildingStorey[key3].object._rContainsElements[0]
                            if (type === typeMark) {
                                if (!data[type]) {
                                    data[type] = {}
                                }
                                if (!data[type][typeName]) {
                                    data[type][typeName] = []
                                }
                                data[type][typeName].push(model.loadedTypes[key1][key2])
                            } else {
                                continue
                            }
                        }
                    }
                }
            } else {
                continue
            }
        }
        //console.log(data)
        //加载tree
        for (let key in model.loadedTypes.IfcBuildingStorey) {
            let typeMark = model.loadedTypes.IfcBuildingStorey[key].object._rContainsElements[0]
                // console.log(typeMark)
            let name = model.loadedTypes.IfcBuildingStorey[key].getName() || model.loadedTypes.IfcBuildingStorey[key].getLongName()
            let dl = document.createElement("dl")
            dl.setAttribute("class", "buildingStorey")
            let dt = document.createElement("dt")
            dt.innerText = name
            dt.onclick = () => {
                let className = dl.getAttribute("class")
                className === "buildingStorey" ? dl.setAttribute("class", "buildingStorey active") : dl.setAttribute("class", "buildingStorey")
            }
            dl.appendChild(dt)
            for (let key1 in data) {
                if (key1 == typeMark) {
                    for (let key2 in data[key1]) {
                        let dd = document.createElement("dd")
                        let a = document.createElement("a")
                        a.innerText = key2
                        dd.appendChild(a)
                        dd.onclick = () => {
                            let className = dd.getAttribute("class")
                            className == null ? dd.setAttribute("class", "active") : dd.removeAttribute("class")
                        }
                        let ul = document.createElement("ul")
                        data[key1][key2].forEach(item => {
                            let li = document.createElement("li")
                                // li.innerText = item.object.Name + "--------------------------" + item.object._t
                            let objectName = item.object.Name || item.object.ObjectType
                            if (!objectName) {
                                objectName = "没有信息"
                            }
                            li.innerText = objectName
                            li.setAttribute("title", objectName)
                            li.setAttribute("data-geometry", item.object._rgeometry)
                            li.setAttribute("class", "geometry")
                            let i = document.createElement("i")
                            i.setAttribute("class", "eye block")
                            i.onclick = e => {
                                e.cancelBubble = true;
                                let className = i.getAttribute("class")
                                i.setAttribute("class", className === "eye block" ? "eye none" : "eye block")

                                item.getGeometry(geometry => {
                                    var threeDObject = Global.viewer.scene.findNode(geometry.gid);
                                    if (threeDObject != null) {
                                        var matrix = threeDObject.nodes[0];
                                        var geometryNode = matrix.nodes[0];
                                        if (geometryNode != null) {
                                            if (className === "eye none") {
                                                threeDObject.findParentByType("enable").setEnabled(true);
                                            } else if (className === "eye block") {
                                                threeDObject.findParentByType("enable").setEnabled(false);
                                            }
                                        }
                                    } else {
                                        console.log("Object not found: " + geometry.gid)
                                    }
                                })
                            }
                            li.appendChild(i)
                            ul.appendChild(li)
                        });
                        dd.appendChild(ul)
                        dl.appendChild(dd)
                    }
                    break
                }
            }
            tree.appendChild(dl)
        }
    }

    function loadModel() {
        let smallProject = Global.currentProject;
        Global.bimServerApi.getModel(smallProject.oid, smallProject.lastRevisionId, smallProject.schema, false, function(model) {
            Global.models[smallProject.lastRevisionId] = model;
            preLoad(function() {
                let geometryLoader = new GeometryLoader(Global.bimServerApi, Global.models, Global.viewer, 'triangles');
                let oids = [];
                for (let key in model.objects) {
                    let obj = model.objects[key];
                    obj.trans.mode = 0;
                    oids.push({
                        oid: obj.object.oid,
                        gid: obj.object._i
                    });
                }
                geometryLoader.setLoadOids([smallProject.lastRevisionId], oids);
                Global.viewer.loadGeometry(geometryLoader);
                loadTree(model)
            });
        });
    }

    function preLoad(callback) {
        let project = Global.currentProject;
        let preLoadQuery = {};
        if (project.schema == "ifc2x3tc1") {
            preLoadQuery = {
                defines: {
                    Representation: {
                        type: "IfcProduct",
                        fields: ["Representation", "geometry"]
                    },
                    ContainsElementsDefine: {
                        type: "IfcSpatialStructureElement",
                        field: "ContainsElements",
                        include: {
                            type: "IfcRelContainedInSpatialStructure",
                            field: "RelatedElements",
                            includes: [
                                "IsDecomposedByDefine",
                                "ContainsElementsDefine",
                                "Representation"
                            ]
                        }
                    },
                    IsDecomposedByDefine: {
                        type: "IfcObjectDefinition",
                        field: "IsDecomposedBy",
                        include: {
                            type: "IfcRelDecomposes",
                            field: "RelatedObjects",
                            includes: [
                                "IsDecomposedByDefine",
                                "ContainsElementsDefine",
                                "Representation"
                            ]
                        }
                    }
                },
                queries: [{
                        type: "IfcProject",
                        includes: [
                            "IsDecomposedByDefine",
                            "ContainsElementsDefine"
                        ]
                    },
                    {
                        type: {
                            name: "IfcRepresentation",
                            includeAllSubTypes: true
                        }
                    },
                    {
                        type: {
                            name: "IfcRepresentationItem",
                            includeAllSubtypes: true
                        }
                    },
                    {
                        type: {
                            name: "IfcProductRepresentation",
                            includeAllSubtypes: true
                        }
                    },
                    {
                        type: "IfcPresentationLayerWithStyle"
                    },
                    {
                        type: {
                            name: "IfcProduct",
                            includeAllSubtypes: true
                        }
                    },
                    {
                        type: "IfcProductDefinitionShape"
                    },
                    {
                        type: "IfcPresentationLayerAssignment"
                    },
                    {
                        type: "IfcRelAssociatesClassification",
                        includes: [{
                                type: "IfcRelAssociatesClassification",
                                field: "RelatedObjects"
                            },
                            {
                                type: "IfcRelAssociatesClassification",
                                field: "RelatingClassification"
                            }
                        ]
                    },
                    {
                        type: "IfcSIUnit"
                    },
                    {
                        type: "IfcPresentationLayerAssignment"
                    }
                ]
            };
        } else {
            preLoadQuery = {
                defines: {
                    Representation: {
                        type: "IfcProduct",
                        field: "Representation"
                    },
                    ContainsElementsDefine: {
                        type: "IfcSpatialStructureElement",
                        field: "ContainsElements",
                        include: {
                            type: "IfcRelContainedInSpatialStructure",
                            field: "RelatedElements",
                            includes: [
                                "IsDecomposedByDefine",
                                "ContainsElementsDefine",
                                "Representation"
                            ]
                        }
                    },
                    IsDecomposedByDefine: {
                        type: "IfcObjectDefinition",
                        field: "IsDecomposedBy",
                        include: {
                            type: "IfcRelAggregates",
                            field: "RelatedObjects",
                            includes: [
                                "IsDecomposedByDefine",
                                "ContainsElementsDefine",
                                "Representation"
                            ]
                        }
                    }
                },
                queries: [{
                        type: "IfcProject",
                        includes: [
                            "IsDecomposedByDefine",
                            "ContainsElementsDefine"
                        ]
                    },
                    {
                        type: "IfcRepresentation",
                        includeAllSubtypes: true
                    },
                    {
                        type: "IfcProductRepresentation"
                    },
                    {
                        type: "IfcPresentationLayerWithStyle"
                    },
                    {
                        type: "IfcProduct",
                        includeAllSubtypes: true
                    },
                    {
                        type: "IfcProductDefinitionShape"
                    },
                    {
                        type: "IfcPresentationLayerAssignment"
                    },
                    {
                        type: "IfcRelAssociatesClassification",
                        includes: [{
                                type: "IfcRelAssociatesClassification",
                                field: "RelatedObjects"
                            },
                            {
                                type: "IfcRelAssociatesClassification",
                                field: "RelatingClassification"
                            }
                        ]
                    },
                    {
                        type: "IfcSIUnit"
                    },
                    {
                        type: "IfcPresentationLayerAssignment"
                    }
                ]
            };
        }

        let model = Global.models[project.lastRevisionId];

        model.query(preLoadQuery, function(loaded) {}).done(function() {
            setTimeout(function() {
                model.isPreloaded = true;
                if (typeof callback == 'function') {
                    callback();
                }
            }, 0);
        });
    }

    require(['BimServerClient'], function() {
        let prvP;
        if (typeof BimServerClient === 'undefined') {
            if (arguments.length > 0) {
                window.BimServerClient = arguments[0].default;
                window.BimServerApiPromise = arguments[0].BimServerApiPromise;
                window.BimServerApiWebSocket = arguments[0].BimServerApiWebSocket;
                window.Model = arguments[0].Model;
            }
        }
        Global.bimServerApi = new BimServerClient(serverHost, {
            setInfo: function(message, timeout) {
                console.log("[default]", message);
            },
            setSuccess: function(message, timeout) {},
            setError: function(err) {
                console.error(err);
            },
            resetStatus: function() {},
            resetStatusQuick: function() {},
            clear: function() {}
        });
        Global.bimServerApi.init(function(api, serverInfo) {
            if (serverInfo.serverState == "RUNNING") {
                console.log('server connect successfully');
                login(Config.userName, Config.password, function() {
                    console.log('login successfully');
                    loadScene();
                }, function() {});
            } else {
                if (typeof fail === 'function') {
                    fail({
                        message: 'server not running.'
                    });
                }
            }
        });
        $(window).resize(function() {
            Global.viewer.resize($(window).width(), $(window).height());
        })
        let viewport = document.getElementById("viewport")
        let geometrys = document.getElementsByClassName("geometry")

        viewport.onclick = e => {
            if (!Global.clickSelect.highlighted) return;
            //console.log(Global.clickSelect)
            for (let item of geometrys) {
                if (item.getAttribute("data-geometry") == Global.clickSelect.highlighted.id) {
                    if (prvP) {
                        prvP.setAttribute("class", "geometry");
                    }
                    item.setAttribute("class", "geometry selected")
                    item.parentElement.parentElement.setAttribute("class", "active")
                    item.parentElement.parentElement.parentElement.setAttribute("class", "buildingStorey active")
                    prvP = item;
                    $(".wrap")[0].scrollTop = item.offsetTop - 50
                    break
                }
            }
        }
    });
});