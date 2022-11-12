Vue.component('constantsList', {
    props: ['x'],
    mounted() {
        this.constants.push(
            {
                name: "PI",
                value: 3.14159
            },
            {
                name: "X",
                value: 5
            }
        )
    },
    data: function () {
        return {
            constants: [],
        }
    },
    methods: {
        remove(item) {
            var index = this.constants.indexOf(item);
            if (index <= -1) {
                Alert.error("Element not found")
                return;
            }
            this.constants.splice(index, 1);
        }
    },
    template: `
    <ul class="list-group">
    <li class="list-group-item d-flex constants-list-item" v-for="item in constants">

      <input type="text" 
      v-model="item.name"
      class="form-control constants-input" 
      placeholder="value not found"
      disabled>

      <input type="number"
      v-model="item.value"
      class="form-control constants-input"
        placeholder="10">


        <div class="form-control">

        </div>
  
        <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
         Type
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Varable</a></li>
          <li><a class="dropdown-item" href="#">Constant</a></li>
        </ul>
      </div>

      <button class="btn btn-primary"
       v-on:click ="remove(item)">
      <i class="fa fa-trash" aria-hidden="true"></i>
     </button>
    </li>
  </ul>

      `})