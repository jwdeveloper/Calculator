function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function makeChart() {


    var xValues = [];
    for (var x = -100; x <= 100; x += 10) {
        xValues.push(x)
    }
    var yValues = [];
    for (var x = -100; x <= 100; x += 10) {
        yValues.push(x)
    }

    return new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: yValues,
                pointRadius: 3,
                borderColor: "white",
                fill: false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: { display: false }
        }
    });
}

Vue.component('inputbox', {
    props: ['global'],
    mounted() {
        this.chart = makeChart()
    },
    data: function () {
        return {
            input: '5+10',
            input2: '1*x+(2-PI)/sin(5+(10-1))',
            output: 0,
            intervalId: 0,
            error: false,
            disabled: true,
            chart: null,
            wait: false
        }
    },
    watch: {
        input: function (val) {
            if (this.wait) {
                return
            }
            this.wait = true;
            Alert.success('start')
            setTimeout(() => {
                this.calculateChart()
                this.wait = false;
                Alert.success('stop')
            }, 500);
        }
    },
    methods: {
        calcualte() {
            var options =
            {
                constants:
                    [
                        { name: "x", value: 20 },
                        { name: "PI", value: 3.14159 }
                    ]
            }
            var goal = 0;
            try {
                goal = Calculator.calculate(this.input, options)
                this.error = false;
            }
            catch (e) {
                console.log(e)
                this.error = true;
                //   Alert.error('unexpected error')
                return;
            }

            this.chart.update()
            var direction = goal > this.output ? 1 : -1;
            var startedPos = this.output;
            var distance = goal - startedPos;
            var speed = distance * 0.03;
            this.disabled = false;
            clearInterval(this.intervalId);
            this.intervalId = setInterval(() => {
                if (this.output != goal) {
                    this.output += roundToTwo(speed * direction);
                }
                if ( this.output > goal) {
                    this.output = goal
                    this.disabled = true;
                    clearInterval(this.intervalId);
                    return;
                }
              

            }, 10);
        },
        calculateChart() {
            var options =
            {
                from: -100,
                to: 100,
                step: 10,
                name: 'x',
                constants: [{ name: "PI", value: 3.14159 }]
            }
            var result = []
            try {
                result = Calculator.calculateChart(this.input, options)
                this.error = false;
            }
            catch (e) {
                console.log(e)
                this.error = true;
                return;
            }
            console.log('result', result)
            console.log('chart', this.chart)

            var data = this.chart.data.datasets[0].data;
            for (var i = 0; i < data.length; i++) {
                data[i] = result[i]
            }

            this.chart.update()
        }
    },
    template: `
    <div class="input-container">
    <constants></constants>
    <br>

    <div class="row">
        <div  class="col-sm-9">
            <input type="text" class="form-control input-box" v-model="input">
        </div>

        <div  class="col-sm-1 equal-div">
        <i v-if="error == true" class="fa fa-thumbs-o-down equal"></i>
        <i v-if="error == false" class="fa fa-hand-o-right equal" :class="{ shake: disabled }" ></i>
        </div>

        <div  class="col-sm-2 output-div">
            <input type="text" class="form-control input-box" v-model="output" disabled>
        </div>
    </div>
    <br>
    <button class="btn btn-lg btn-primary btn-block"  v-on:click ="calcualte()">Calculate</button>
    <br>
    <br>
    <br>
    <canvas id="myChart" ></canvas>
</div>
      `})

