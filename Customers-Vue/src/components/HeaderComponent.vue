<script setup>

</script>

<template>
    <header classs="header">
        <h1 class="title">Customers page</h1>
            <nav>
                <ul class="nav-list">
                    <li>
                        <a class="link" href="/home">Home</a>
                    </li>
                    <li>
                        <a class="link" href="/customers">Customers</a>
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