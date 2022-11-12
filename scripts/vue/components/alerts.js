Alert =
{
    setHandle: function (handle) {
        this.handle = handle
    },
    success: function (message) {
        this.handle.add(message, 'success', 1000)
    },
    warning: function (message) {
        this.handle.add(message, 'warning', 1000)
    },
    error: function (message) {
        this.handle.add(message, 'danger', 1000)
    }
}

Vue.component('alerts', {
    props: ['global'],
    mounted() {
        Alert.setHandle(this)
    },
    data: function () {
        return {
            alerts: [],
        }
    },
    methods: {
        remove(value) {
            var index = this.alerts.indexOf(value);
            if (index !== -1) {
                this.alerts.splice(index, 1);
            }
        },
        add(message, type, timeout = 1000) {

            const alert = {
                message: message,
                type: "alert-" + type
            };

            this.alerts.push(alert);

            setTimeout(() => {
                this.remove(alert)
            }, 2000);
        }
    },
    template: `
        <div class="alerts-container">
           <div class="alert" role="alert"  v-for="alert in alerts"  :class=alert.type>
                {{alert.message}}
                <span class="closebtn" v-on:click="remove(alert)">&times;</span>
            </div>
        </div>
      `})

