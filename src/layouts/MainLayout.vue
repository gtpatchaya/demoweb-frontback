<template>
    <div class="main-layout">
        <!-- ส่วนของ Header -->
        <header>
            <nav class="navbar navbar-expand-lg custom-navbar">
                <div class=" container-fluid d-flex justify-content-between align-items-center">
                    <a class="navbar-brand d-flex align-items-center" href="#">
                        <img src="@/assets/images/logo.png" alt="Logo" width="90" height="80">
                        Com IT Solutions
                    </a>

                    <div class="d-flex align-items-center">
                        <div>
                            <h5><span class="badge text-bg-secondary bg-success rounded-pill">Online</span></h5>
                        </div>
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <div>
                                <h2 class="text-white">ด่าน</h2>
                            </div>
                            <div style="color: aqua; font-weight: 600;">{{ currentTime }}</div>

                        </div>
                    </div>

                    <div class="d-flex align-items-center">

                        <div>
                            <h4 class="text-white me-3">นางสาวธรพร ครีสมร</h4>
                        </div>
                        <div>
                            <img src="@/assets/images/profile.png" alt="User Profile" class="rounded-circle me-2"
                                width="80" height="80">
                        </div>
                        <div>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="@/assets/images/th.png" alt="TH" width="24" height="24"> TH
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><a class="dropdown-item" href="#"><img src="@/assets/images/en.png" alt="US"
                                                width="24" height="16">
                                            EN</a></li>
                                    <li><a class="dropdown-item" href="#"><img src="@/assets/images/th.png" alt="TH"
                                                width="24" height="16">
                                            TH</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>


        <div class="container-fluid d-flex flex-grow- mt-4">
            <!-- Sidebar -->
            <aside class="sidebar bg-dark p-3 d-flex flex-column justify-content-between align-items-center">
                <div class="nav-icons">
                    <ul class="nav flex-column align-items-center">
                        <li class="nav-item mb-3">
                            <router-link class="nav-link icon-link" to="/" exact-active-class="active-link">
                                <font-awesome-icon :icon="['fas', 'video']" />
                            </router-link>
                        </li>
                        <li class="nav-item mb-3">
                            <router-link class="nav-link icon-link" to="/reports" exact-active-class="active-link">
                                <font-awesome-icon :icon="['fas', 'chart-simple']" />
                            </router-link>
                        </li>
                        <li class="nav-item mb-3">
                            <router-link class="nav-link icon-link" to="/SpecialLicense"
                                exact-active-class="active-link">
                                <font-awesome-icon :icon="['fas', 'car']" />
                            </router-link>
                        </li>
                        <li class="nav-item mb-3">
                            <router-link class="nav-link icon-link" to="/database" exact-active-class="active-link">
                                <font-awesome-icon :icon="['fas', 'database']" />
                            </router-link>
                        </li>
                        <li class="nav-item mb-3">
                            <router-link class="nav-link icon-link" to="/Setting" exact-active-class="active-link">
                                <font-awesome-icon :icon="['fas', 'gear']" />
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link icon-link" to="/userSetting" exact-active-class="active-link">
                                <font-awesome-icon :icon="['fas', 'user-gear']" />
                            </router-link>
                        </li>
                    </ul>
                </div>
                <!-- Arrow at the top -->
                <!-- <div class="arrow-up">
                    <font-awesome-icon :icon="['fas', 'angle-up']" />
                </div> -->
            </aside>

            <!-- Main content -->
            <main class="content p-4 flex-grow-1">
                <router-view></router-view>
            </main>
        </div>

        <!-- Footer -->
        <!-- <footer class="mt-auto py-3 bg-light text-center">
            <div class="container">
                <span class="text-muted">© 2024 My App</span>
            </div>
        </footer> -->
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'MainLayout',
    data() {
        return {
            currentTime: '',
        };
    },
    mounted() {
        this.getCurrentTime();
        setInterval(this.getCurrentTime, 1000);
    },
    methods: {
        getCurrentTime() {
            this.currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        }
    }
};
</script>

<style scoped>
.nav-header {
    border: solid;
}

.main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.container-fluid {
    display: flex;
    flex-grow: 1;
}

.sidebar {
    width: 80px;
    background-color: #000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-radius: 10px;
    height: 100%;
    border: 3px solid #6ba3ec;
}

.nav-icons ul {
    list-style: none;
    padding: 0;
}

.nav-icons .nav-item {
    width: 60px;
    height: 60px;
    background-color: #1e1e1e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #2a7be4;
}

.nav-icons .nav-item.active,
.nav-icons .nav-item:hover {
    background-color: #6ba3ec;
    color: #fff;
}

.icon-link {
    color: #2a7be4;
    font-size: 1.5rem;
}

.icon-link.active-link {
    color: #fff;
}

.arrow-up {
    font-size: 2rem;
    color: #2a7be4;
}


</style>
