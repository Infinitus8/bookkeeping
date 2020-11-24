<template>
    <div class="card-body">
        <div v-if="isLoading" class="text-center">Загрузка записей...</div>
        <div v-else id="table" class="table-editable">
            <span class="table-add float-left mb-3 mr-2">
                <router-link to="/records/new" class="btn btn-primary btn-rounded btn-bg my-0">
                    Новая запись
                </router-link>
                </span>

            <table class="table table-bordered table-responsive-md table-striped text-center">
                <thead>
                    <tr>
                        <th class="text-center">Тип</th>
                        <th class="text-center">Категория</th>
                        <th class="text-center">Дата</th>
                        <th class="text-center">Сумма</th>
                        <th class="text-center">Комментарий</th>
                        <th class="text-center">Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="record in records">
                        <tr v-bind:key="record.id">
                            <td>{{ record.type }}</td>
                            <td>{{ record.category }}</td>
                            <td>{{ record.date }}</td>
                            <td>{{ record.sum }}</td>
                            <td>{{ record.description }}</td>
                            <td>
                                <button class="btn btn-danger" v-bind:class="{ 'is-loading' : isDeleting(record.id)}" @click="deleteRecord(record.id)">Удалить запись</button>
                                <div v-if="record.isDeleting">Загрузка...</div>
                            </td>
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
import Vue from 'vue'
//import { router } from '../main'

export default {
    data() {
        return {
            isLoading: true,
            records: {}
        }
    },
    async created() {
        try {
            const response = await axios.get(API_BASE_URL + '/records')
            this.records = response.data.data
            this.getTotalSum()
            this.isLoading = false
        } catch(e) {
            //
        }
    },

    methods: {

        getTotalSum() {
            for (var i=0; i < this.records.length; i++) {
                var rObj = this.records[i]
                if (rObj.type === 'Доход')
                    this.totalIncome += rObj.sum
                else (rObj.type === 'Расход')
                    this.totalExpenses += rObj.sum
            }
        },
        thousSeparator(numStr)
        {
            numStr += '';
            let x = numStr.split('.');
            let x1 = x[0];
            let x2 = x.length > 1 ? ',' + x[1] : '';
            let rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },

        isDeleting(id) {
            let index = this.records.findIndex(record => record.id === id)
            return this.records[index].isDeleting
        },
        async deleteRecord(id) {
            let index = this.records.findIndex(record => record.id === id)
            Vue.set(this.records[index], 'isDeleting', true)
            await axios.delete(API_BASE_URL + '/records/' + id)
            this.records.splice(index, 1)

        }
    }

}
</script>
