<template>
    <div class="movielist">
      <div  v-for="item in movieList" :key="item.index" style="display: inline-block;margin:10px">
        <div>
          <img :src="item.cover">
        </div>

        <span>{{item.title+'---'+item.rate}}</span>
      </div>
    </div>
</template>

<script>
  import oneoneone from "@/api/oneoneone";
    export default {
        name: "Xuanxaing1",
        data(){
            return{
                movieList:[]
            }
        },
        methods:{
            async getDouban(){
                let reqData = {
                    type:'movie',
                    tag:'热门',
                    page_limit:14,
                    page_start:0
                }
                let res = await oneoneone.getDouban(reqData)
                // console.log(res)
                this.movieList = res.subjects
                // console.log(this.movieList)
            }
        },
        mounted() {
            this.getDouban()
            // this.$axios
            //     .get("/api/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0")
            //     .then(res => {
            //         console.log(res)
            //         // this.list = res.data.result;
            //         // }
            //     })
            //     .catch(e => {
            //         // console.log(e);
            //     });
        }
    }
</script>

<style scoped>
  /*.movieliast {*/
    img{
      width: 200px;
      height: 400px;
    }
  /*}*/
</style>
<style>
  * {
    margin: 0;
    padding: 0;
  }
</style>
