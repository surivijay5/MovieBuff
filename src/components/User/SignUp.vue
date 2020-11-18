<template>
    <div class="m-3">
        <userInfoForm :signUpObject="signUpObject" :errorFieldIds="errorFieldIds" @save="saveData"/>
    </div>
</template>

<script>
import userInfoForm from '../shared/userInfoForm.vue'

export default {
  name: "SignUp",
  components: {
      userInfoForm
  },
  created(){
  },
  methods:{
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
           this.$router.push({name : 'home'});
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
          signUpObject:[
            {
                type: 'text',
                label: 'Name',
                name: 'name',
                size: 20,
                BindedValue:'',
                isRequired : true,
                isEditable : true
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
                isRequired : true,
                isEditable : true
            }
          ],
          errorFieldIds : []
      }
  }
};
</script>
<style scoped>
</style>