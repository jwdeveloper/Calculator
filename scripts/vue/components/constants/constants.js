Vue.component('constants', {
    props: ['global'],
    mounted() {
    },
    data: function () {
        return {
            constants: [],
        }
    },
    methods: {
        add(value) 
        {
        
        }
    },
    template: `
    <div class="constants">
    <small class="title">add value</small>
    <br>
    <constantsForm></constantsForm>
    <br>
    <constantsList></constantsList>
</div>
      `})