<template>
  <ErrorPage v-if="error"></ErrorPage>
  <ProgressBar v-if="loading"></ProgressBar>
  <div v-if="!loading" id="main">
    <div class="test ">
      <input
      v-if="!error"
        @keyup="serach_item"
        v-model="serach_word"
        class="input-search font-4 shadow-sm"
        type="text"
        placeholder="جستجو"
      />
    </div>
    <br />
    <br />
    <br />
    <div class="container">
      <div v-for="item in items"
           :key="item.id" class="shadow-lg my-3 rounded-2">
        <router-link
            :to="{ name: 'ContentList', params: { conversation_id: item.id } }"
            class="shadow-lg roter rounded-2">
          <div class="bg_slider load_slider">
            <img  class="content rounded-top" :src="item.pic" alt="" />
          </div>
          <p class="font-4 w-100 p-3 rounded-2">{{ item.title }}</p>
        </router-link>
      </div>

      <br>
      <br>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import ProgressBar from "@/components/common/ProgressBar";
import ErrorPage from "@/components/common/ErrorPage";

export default {
  name: "HomePage",
  components: { ProgressBar,ErrorPage },
  setup() {
    var urlBase = localStorage.getItem("urlBase");
    var apiKey = localStorage.getItem("apiKey");

    var items = ref([]);
    var loading = ref(false);
    var serach_word = ref("")
    var error = ref(false)
    // var storage = localStorage;
    // storage.setItem("urlBase", "http://tazarob.wo9.ir/");

    function load_deta() {
      loading.value = true;
      axios.defaults.headers.common['Access-Control-Allow-Origin']='*';
      axios.defaults.headers.common['Access-Control-Allow-Headers']='Origin,X-requested-With,Content-Type,Accept';

      axios
        .post(urlBase + "show_conversation", {
          ApiKey: apiKey,
        })
        .then(function (res) {
          loading.value = false;
          var response = res.data;
          console.log(response);
          items.value = response;
          // storage.setItem("urlBase", "http://tazarob.wo9.ir/");
        }) .catch(() => {
          (error.value = true), (loading.value = false);
        });
    }

    function serach_item() {
      axios.defaults.headers.common['Access-Control-Allow-Origin']='*';
      axios.defaults.headers.common['Access-Control-Allow-Headers']='Origin,X-requested-With,Content-Type,Accept';
      axios
        .post(urlBase + "search", {
          ApiKey: apiKey,
          word:serach_word.value,
        })
        .then(function (res) {
          var response = res.data;
          console.log(response);
          items.value = response.items
        }).catch(() => {
          (error.value = true), (loading.value = false);
        });
    }

    load_deta();

    return {
      items,
      ProgressBar,
      loading,
      load_deta,
      serach_item,
      serach_word,
      error,
    };
  },
};
</script>
<style scoped>
.input-search {
  background-color: white;
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: 10px 15px;
}

.content {
  width: 100%;
  height: 200px !important;

}

.bg_slider{
  height: 200px !important;
}
/* = */

</style>
