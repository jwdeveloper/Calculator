Vue.component('constantsForm', {
    props: ['constants'],
    mounted() {
    },
    data: function () {
        return {
          
        }
    },
    methods: {
        add(value) 
        {
        
        }
    },
    template: `
    <div>
  
    <div class="constants-form">
    <input type="text" 
    class="form-control" 
    placeholder="X">
    <input type="number"
    
     class="form-control"
       placeholder="10">
    <br>
    <button class="btn btn-primary constants-form-btn" type="submit">
        <i class="fa fa-plus" aria-hidden="true"></i>
    </button>
    </div>
    </div>

      `})