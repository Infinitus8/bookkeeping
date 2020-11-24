<template>
    <div class="card-body">
        <div v-if="isLoading" class="text-center">Загрузка записей...</div>
        <div v-else id="table" class="table-editable">
                    <div class="text-center text-success">Суммарный доход: {{ thousSeparator(totalIncome) }}</div>
                    <div class="text-center text-danger">Суммарные расходы: {{ thousSeparator(totalExpenses) }}</div>
                    <div class="text-center text-primary">Баланс: {{ thousSeparator(totalIncome - totalExpenses) }}</div>
            <table class="table table-bordered table-responsive-md table-striped text-center">
                <thead>
                    <tr>
                        <th class="text-center">Тип</th>
                        <th class="text-center">Категория</th>
                        <th class="text-center">Итого</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="genRec in genRecords">
                        <tr v-bind:key="genRec.id">
                            <td>{{ genRec.type }}</td>
                            <td>{{ genRec.category }}</td>
                            <td>{{ thousSeparator(genRec.sum) }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import { API_BASE_URL } from './app'
// import Vue from 'vue'
//import { router } from '../main'

export default {
    data() {
        return {
            isLoading: true,
            totalIncome: 0,
            totalExpenses: 0,
            genRecords: [],
            records: {}
        }
    },
    async created() {
        try {
            const response = await axios.get(API_BASE_URL + '/records')
            this.records = response.data.data
            this.filterRecords(this.records)
            this.getTotalSum()
            this.isLoading = false
        } catch(e) {
            //
        }
    },

    methods: {
        filterRecords(records){
            var categoriesArray = []
            for (var i=0; i < records.length; i++) {
                categoriesArray.push(records[i].category)
            }
            categoriesArray = categoriesArray.filter((item, index) => categoriesArray.indexOf(item) === index)
            for (var j=0; j < categoriesArray.length; j++) {
                var c = categoriesArray[j]
                var sum = 0
                var type = ''
                for (var k=0; k < records.length; k++) {
                    var rec = records[k]
                    if (rec.category === c) {
                        type = rec.type
                        sum += rec.sum
                    }
                }
                var genRec = {
                    id: j,
                    type: type,
                    category: c,
                    sum: sum
                }
                this.genRecords.push(genRec)
            }
        },
        // dateToArray(dateStr) {
        //     dateStr = dateStr.split('-')
        //     for (var i=0; i < dateStr.length; i++) {
        //         dateStr[i] = parseInt(dateStr[i])
        //     }
        //     return dateStr
        // },
        // sortDateArray(dateArray) {
        //     dateArray = this.dateToArray(dateArray)
        //     var temp = 0
        //     for (var i=0; i < dateArray.length; i++) {
        //         for (var j=0; j < dateArray.length - 1 - i; j++) {
        //             if (dateArray[j][0] < dateArray[j+1][0]
        //             || (dateArray[j][0] === dateArray[j+1][0] && dateArray[j][1] < dateArray[j+1][2])
        //             || (dateArray[j][0] === dateArray[j+1][0] && dateArray[j][1] === dateArray[j+1][2]
        //             && dateArray[j][3] < dateArray[j+1][3])) {
        //                 temp = dateArray[j]
        //                 dateArray[j] = dateArray[j+1]
        //                 dateArray[j+1] = temp
        //             }
        //         }
        //     }
        // },

        getTotalSum() {
            for (var i=0; i < this.records.length; i++) {
                var rObj = this.records[i]
                if (rObj.type === 'Доход')
                    this.totalIncome += rObj.sum
                else if (rObj.type === 'Расход')
                    this.totalExpenses += rObj.sum
            }
        },

        thousSeparator(numStr)
        {
            numStr += '';
            let x = numStr.split('.');
            let x1 = x[0];
            let x2 = x.length > 1 ? ' ' + x[1] : '';
            let rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ' ' + '$2');
            }
            return x1 + x2;
        },
    }

}
</script>
