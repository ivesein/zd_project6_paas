import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
// import Bim from "./views/Bim.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/iot_server",
      name: "IotServer",
      component: () => import("./views/IotServer.vue")
    },
    // video service
    {
      path: "/video_face_check",
      name: "videoFaceCheck",
      component: () => import("./views/VideoFaceCheck.vue")
    },
    {
      path: "/video_carnum_check",
      name: "videoCarNumCheck",
      component: () => import("./views/VideoCarNumCheck.vue")
    },
    {
      path: "/vehicleplaterec",
      name: "vehicleplaterec",
      component: () => import("./views/VehiclePlateRec.vue")
    },
    {
      path: "/invoice_check",
      name: "invoiceCheck",
      component: () => import("./views/InvoiceCheck.vue")
    },
    {
      path: "/face_detect",
      name: "face_detect",
      component: () => import("./views/FaceDetect.vue")
    },
    {
      path: "/face_search",
      name: "face_search",
      component: () => import("./views/FaceSearch.vue")
    },
    {
      path: "/video_storage",
      name: "video_storage",
      component: () => import("./views/VideoStorage.vue")
    },
    {
      path: "/voice_rec",
      name: "voice_rec",
      component: () => import("./views/VoiceRec.vue")
    },
    {
      path: "/sip_protocol",
      name: "sip_protocol",
      component: () => import("./views/SipProtocol.vue")
    },
    {
      path: "/drawing_monitor",
      name: "drawing_monitor",
      component: () => import("./views/DrawingMonitor.vue")
    },
    {
      path: "/safety_hat_moni",
      name: "safety_hat_moni",
      component: () => import("./views/SafetyHatMoni.vue")
    },
    {
      path: "/bim_model",
      name: "bim_model",
      component: () => import("./views/BimModel.vue")
    },
    {
      path: "/bim_modeling",
      name: "bim_modeling",
      component: () => import("./views/BimModeling.vue")
    },
    {
      path: "/file_conversion",
      name: "file_conversion",
      component: () => import("./views/FileConversion.vue")
    },
    {
      path: "/img_text_check",
      name: "img_text_check",
      component: () => import("./views/ImgTextCheck.vue")
    },
    {
      path: "/word_analysis",
      name: "word_analysis",
      component: () => import("./views/WordAnalysis.vue")
    },
    {
      path: "/text_detection",
      name: "text_detection",
      component: () => import("./views/TextDetection.vue")
    },
    {
      path: "/face_compare",
      name: "face_compare",
      component: () => import("./views/FaceCompare.vue")
    },
    {
      path: "/video_meeting",
      name: "video_meeting",
      component: () => import("./views/VideoMeeting.vue")
    },
    {
      path: "/draw_to_book",
      name: "draw_to_book",
      component: () => import("./views/DrawToBook.vue")
    },
    {
      path: "/white_board",
      name: "white_board",
      component: () => import("./views/WhiteBoard.vue")
    },
    {
      path: "/cloud_disc",
      name: "cloud_disc",
      component: () => import("./views/CloudDisc.vue")
    },
    {
      path: "/screen_show",
      name: "screen_show",
      component: () => import("./views/ScreenShow.vue")
    },
    {
      path: "/image_enhance",
      name: "image_enhance",
      component: () => import("./views/ImageEnhance.vue")
    },
    {
      path: "/desktop",
      name: "desktop",
      component: () => import("./views/Desktop.vue")
    }
  ]
});
