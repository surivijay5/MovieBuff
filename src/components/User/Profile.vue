<template>
    <div class="m-3">
        <userInfoForm v-if="showSignUpForm" :signUpObject="signUpObject" :errorFieldIds="errorFieldIds" @save="saveData"/>
        <div v-else>
            <b-card body-class="text-left">
                <b-card-text>
                    No Details Found. Sign Up with us First.
                </b-card-text>

                <b-button @click="goToSignUpPage()" variant="primary">Go To Sign Up </b-button>
            </b-card>
        </div>
    </div>
</template>

<script>
import userInfoForm from '../shared/userInfoForm.vue'

import {BCard,BCardText,BButton} from 'bootstrap-vue'

export default {
  name: "Profile",
  components: {
      userInfoForm,
      BCard,
      BCardText,
      BButton
  },
  created(){
      this.setSignUpObject();
  },
  methods:{
        goToSignUpPage(){
            this.$router.push({ name: "signUp" });
        },
        setSignUpObject(){
            var userData = localStorage.getItem('userData');
            if(userData == null || userData == ""){
                this.showSignUpForm = false;
                return
            }
            else{
                userData = JSON.parse(userData);
                this.signUpObject.forEach(p=>{
                    p.BindedValue = userData[p.name]
                })
                this.showSignUpForm = true;
            }

        },
        saveData(){
           var dataToBeSaved = {};
           this.signUpObject.forEach(p => {
               dataToBeSaved[p.name] = p.BindedValue
           })
            if(!this.validateData(dataToBeSaved)){
                 this.$toastr.e("Please enter a value for all the required fields.");
                 return;
            }
              this.$toastr.s("Saved Successfully");
           localStorage.setItem('userData' , JSON.stringify(dataToBeSaved));
        },
        validateData(data){
            var requiredFields = this.signUpObject.filter(p=>p.isRequired).map(p=>p.name);
            requiredFields.forEach(field => {
                    if(data[field] === "" || data[field] === null){
                        this.errorFieldIds.push(field);
                    }                    
                });

            if(this.errorFieldIds.length > 0){
                setTimeout(function () { this.errorFieldIds =  []  }.bind(this), 6000);
                return false;
            } else {
                return true;
            }
        },
  },
  data(){
      return {
          isLoading : false,
          showSignUpForm : false,
          signUpObject:[
            {
                type: 'text',
                label: 'Name',
                name: 'name',
                size: 20,
                BindedValue:'',
                isRequired : false,
                isEditable : false
            },
            {
                type: 'number',
                label: 'Phone Number',
                name: 'phNo',
                BindedValue:'',
                size: 20,
                isRequired : true,
                isEditable : true

            },
            {
                type: 'text',
                label: 'E mail',
                name: 'email',
                BindedValue:'',
                size: 20,
                isRequired : true,
                isEditable : true
            },
            {
                type: 'text',
                label: 'Address',
                name: 'address',
                BindedValue:'',
                size: 50,
                isRequired : false,
                isEditable : false
            }
          ],
          errorFieldIds : []
      }
  }
    
}
</script>
<style scoped>

</style>