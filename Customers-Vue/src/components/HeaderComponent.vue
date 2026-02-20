<script setup>

</script>

<template>
    <header class="header">
        <h1 class="title">Customers page</h1>
            <nav>
                <ul class="nav-list">
                    <li>
                        <router-link class="link" to="/">Home</router-link>
                    </li>
                    <li>
                        <router-link class="link" to="/customers">Customers</router-link>
                    </li>
                </ul>
            </nav>
    </header>
</template>

<style scoped>
.header {
    background-color: black;
    color: beige;
    padding: 25px;
    text-align: center;
    .title {
        margin: 0;
    }
    .nav-list {
        display: flex;
        justify-content:  space-around;
        list-style-type: none;
        .link {
            color: white;
            text-decoration: none;
        }
    }
}
</style>