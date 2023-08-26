<template>
  <EmptyPage v-if="items == '' && !loading && !error"></EmptyPage>
    <ErrorPage v-if="error"></ErrorPage>
  <ProgressBar v-if="loading"></ProgressBar>
  <div v-if="!loading" id="main">
    <br />
    <br />
    <br />
    <div class="test ">
      <div class="div-title d-flex">
        <p class="font-4 m-0">{{ title }}</p>
        <router-link to="/">
          <img class="svg-arrow" src="../assets/img/arrow.svg" alt="" />
        </router-link>
      </div>
    </div>
    <div class="container">
      <div v-for="item in items" :key="item.id"  class="shadow-lg my-3 rounded-3">

          <div style="height: 200px !important; width: 100%" v-html="item.link"></div>

        <!-- <div style="height: 200px; width: 100%;" class="h_iframe-aparat_embed_frame"><span style="display: block;padding-top: 57%"></span><iframe src="https://www.aparat.com/video/video/embed/videohash/uH4AZ/vt/frame"  allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div> -->
        <p class="font-4 w-100 p-3  rounded-3">{{ item.title }}</p>
      </div>
    </div>
    <br />
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
import ProgressBar from "@/components/common/ProgressBar";
import ErrorPage from "@/components/common/ErrorPage";
import EmptyPage from "@/components/common/EmptyPage";

export default {
  name: "HomePage",
  components: { ProgressBar,ErrorPage,EmptyPage },
  setup() {
    var urlBase = localStorage.getItem("urlBase");
    var apiKey = localStorage.getItem("apiKey");

    const route = useRoute();

    var items = ref([]);
    var title = ref("");
    var loading = ref(false);
    var conversationId = route.params.conversation_id;
    var error = ref(false)


    function load_deta() {

      loading.value = true;
      axios.defaults.headers.common['Access-Control-Allow-Origin']='*';
      axios.defaults.headers.common['Access-Control-Allow-Headers']='Origin,X-requested-With,Content-Type,Accept';
      axios
        .post(urlBase + "show_section", {
          ApiKey: apiKey,
          id: conversationId,
        })
        .then(function (res) {
          loading.value = false;
          var response = res.data;
          console.log(response);
          items.value = response.sections;
          title.value = response.title;
        }).catch(() => {
          (error.value = true), (loading.value = false);
        });
    }

    load_deta();

    return { items, title, loading, load_deta,error };
  },
};
</script>
<style scoped>
.content {
  width: 100%;
  height: 250px;
}

.div-title {
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 10px 15px;
}

.svg-arrow {
  height: 18px;
}

.bg_slider{
height: 200px !important;
}
</style>
