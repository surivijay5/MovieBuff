<template>
    <div>
        <div v-if="isLoading">
            <b-spinner variant="success" label="Loading"></b-spinner>
        </div>
        <div v-else>
            <b-form>
                <b-input-group>
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="search" placeholder="Search Images in Batman vs Superman" v-model="query" id="text-password" aria-describedby="password-help-blockewew"></b-form-input>
                </b-input-group>
                <b-form-text class="text-left">
                    Showing {{filteredStills.length}} out of {{stills.length}}
                </b-form-text>
            </b-form>
            <b-card-group columns>
                <b-card
                    v-for="(still,index) in filteredStills" :key="index"
                    :img-src="still.url"
                    img-alt="Image" img-top 
                    @click="showExtraDetails(still,index)">
                    <b-card-text>
                        {{still.caption}}<br />
                        <span v-if="still.showExtraDetails">
                            <b-row v-for="(detail,id) in extraDetails" :key="id">
                                <b-col cols="3" align-self="center">{{detail.name}}</b-col>
                                <b-col>{{still[detail.value]}}</b-col><br />
                            </b-row>
                        </span>
                    </b-card-text>
                </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
import axios from "axios";

import { BCardGroup,BCard,BCardText,BSpinner,BFormInput,BInputGroupPrepend,BInputGroup,BForm,BFormText,BRow,BCol } from 'bootstrap-vue'

export default {
  name: "Home",
  components: {
    BCardGroup,
    BCard,
    BCardText,
    BSpinner,
    BFormInput,
    BInputGroupPrepend,
    BInputGroup,
    BFormText,
    BForm,
    BRow,
    BCol
  },
  created(){
      this.getAvengersImages();
  },
  computed: {
    filteredStills(){
      if(this.query){
        return this.stills.filter((item)=>{
            return this.query.toLowerCase().split(' ').every(v => item.caption.toLowerCase().includes(v))
        })
      }else{
        return this.stills;
      }
    }
  },
  methods:{
      getAvengersImages(){
            const options = {
                method: 'GET',
                url: 'https://imdb8.p.rapidapi.com/title/get-images',
                params: {tconst: 'tt2975590', limit: '100'},
                headers: {
                    'x-rapidapi-key': '031ad8c8c5msh0f6e3ccdf65c137p1233ecjsnf3f808a1958f',
                    'x-rapidapi-host': 'imdb8.p.rapidapi.com'
                }
        };
        this.isLoading = true;
        axios.request(options)
        .then(response =>{
            this.stills = response.data.images;
        })
        .catch(error =>{
            console.error(error);
        })
        .finally(()=>{
            this.isLoading = false;
        });
      },
      showExtraDetails(still,index){
          still.showExtraDetails = true;
          this.$set(this.stills, index, still);
      }
  },
  data(){
      return{
          stills : [],
          query : '',
          isLoading : false,
          extraDetails :[
              {
                  name:'Id',
                  value:'id'
              },
              {
                  name:'Width',
                  value:'width'
              },
              {
                  name:'Created On',
                  value:'createdOn'
              }
            ]
      }
  }
};
</script>
<style scoped>
 .card{
     cursor: pointer;
 }
</style>