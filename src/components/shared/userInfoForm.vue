<template>
        <div>
            <div v-if="isLoading" class="pt-3 m-5">
                <b-spinner variant="success" label="Loading"></b-spinner>
            </div>
            <div v-if="!isLoading">
                <b-card body-class="text-left">
                    <b-card-text>
                        <b-row v-for="(row,index) in signUpObject" :key="index">
                            <b-col cols="3" v-if="row.isEditable">
                                <label :for="row.name" ><b>{{row.label}}</b><span v-if="row.isRequired" style="color:red">*</span>&nbsp;&nbsp;:</label>
                            </b-col>
                            <b-col cols="5" v-if="row.isEditable">
                                <!--text-->
                                <b-form-input  v-if="row.type=='text' && row.size <= 20" :id="row.name" v-model="row.BindedValue"  type="text" v-bind:class="{ 'component-glow': hasError(row.name) }" />
                                <!--textarea-->
                                <b-form-textarea v-else-if="row.type=='text' && row.size > 20" :id="row.name" v-model="row.BindedValue"  rows="3" max-rows="3" v-bind:class="{ 'component-glow': hasError(row.name) }" />
                                <!--inputbox: number-->
                                <b-form-input v-else-if="row.type=='number'" :id="row.name" v-model="row.BindedValue" type="number" v-bind:class="{ 'component-glow': hasError(row.name) }" />
                            </b-col><br /><br />
                        </b-row>
                    </b-card-text>
                    <b-button variant="success" @click="saveData()"> Save</b-button>
                </b-card>
            </div>
        </div>
</template>

<script>
// import axios from "axios";

import {BSpinner,BFormInput,BRow,BCol,BCard,BCardText} from 'bootstrap-vue'

export default {
  name: "userInfoForm",
  components: {
      BSpinner,
      BFormInput,
      BRow,
      BCol,
      BCard,
      BCardText
  },
  props: ['signUpObject','errorFieldIds'],
  created(){
  },
  methods:{
        hasError(id) {
            return (this.errorFieldIds.length > 0 && this.errorFieldIds.includes(id));
        },
        saveData(){
            this.$emit('save');
        }
  },
  data(){
      return {
          isLoading : false
      }
  }
};
</script>
<style scoped>
    @keyframes glowing {
        0% { box-shadow: 0 0 -5px #ff6666; }
        40% { box-shadow: 0 0 10px #ff3333; }
        60% { box-shadow: 0 0 10px #ff3333; }
        100% { box-shadow: 0 0 -5px #ff6666; }
    }

    .component-glow{
        animation: glowing 2000ms infinite
    }
</style>