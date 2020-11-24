<template>
    <div class="card-body">
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label>Тип</label>
                <select v-model="type" class="form-control">
                    <option>Доход</option>
                    <option>Расход</option>
                </select>
            </div>
            <div class="form-group">
                <label>Категория</label>

                <select v-if="type === 'Расход'" v-model="category" class="form-control" required>
                    <option>Продукты питания</option>
                    <option>Транспорт</option>
                    <option>Мобильная связь</option>
                    <option>Интернет</option>
                    <option>Развлечения</option>
                    <option>Другое</option>
                </select>
                <select v-else-if="type === 'Доход'" v-model="category" class="form-control" required>
                    <option selected>Заработная плата</option>
                    <option>Иные доходы</option>
                </select>
            </div>
            <div class="form-group">
                <label>Дата</label>
                <input id="datePicker" class="form-control" type="date" v-model="date" required>
            </div>
            <div class="form-group">
                <label>Сумма</label>
                <input class="form-control" type="number" min="1000" step="1000" v-model="sum" required>
            </div>
            <div class="form-group">
                <label>Комментарий</label>
                <textarea class="form-control" maxlength="255" v-model="description"></textarea>
            </div>
            <button class="btn btn-primary" v-bind:class="{ 'is-loading' : isLoading }">Добавить запись</button>
            <div v-if="isLoading">Загрузка...</div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { router, API_BASE_URL } from './app'


export default {

    data() {
        return {
            type: 'Доход',
            category: '',
            date: new Date().toISOString().substr(0, 10),
            sum: 1000,
            description: ' ',

            isLoading: false
        }
    },
    methods: {
        onSubmit() {
            this.isLoading = true
            this.postRecord()
        },
        async postRecord() {
            await axios.post(API_BASE_URL + '/records', this.$data)
                .then(response => {
                    this.type = 'Доход'
                    this.category = ''
                    this.date = new Date().toISOString().substr(0, 10)
                    this.sum = 1000
                    this.description = ''
                    this.isLoading = false
                    this.$emit('completed', response.data.data)
                })
                .catch(function() {
                    this.isLoading = false
                })
                router.push('/records')
        }
    }
}
</script>
