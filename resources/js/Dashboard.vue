<template>
    <div class="card">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <router-link to="/" class="nav-link">Домой</router-link>
                    </li>
                    <li>
                        <router-link to="/records" class="nav-link">Записи</router-link>
                    </li>
                    <li>
                        <router-link to="/stats" class="nav-link">Статистика</router-link>
                    </li>
                </ul>   
            </div>
        </nav>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {

}
</script>