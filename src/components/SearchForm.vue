<template>
    <div class="search-form rounded p-4 bg-dark text-white primary-border">
        <h5 class="pb-2">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="me-3" />เงื่อนไขการค้นหา
        </h5>
        <form @submit.prevent="handleSearch">
            <!-- หมวดอักษร -->
            <div class="mb-3">
                <label for="regPrefix" class="form-label">หมวดอักษร</label>
                <input type="text" id="regPrefix" class="form-control" v-model="form.regPrefix" />
            </div>

            <!-- เลขทะเบียน -->
            <div class="mb-3">
                <label for="licenseNumber" class="form-label">เลขทะเบียน</label>
                <input type="text" id="licenseNumber" class="form-control" v-model="form.licenseNumber" />
            </div>

            <!-- หมวดจังหวัด -->
            <div class="mb-3">
                <label for="province" class="form-label">หมวดจังหวัด</label>
                <select id="province" class="form-select" v-model="form.provinceId">
                    <option value="" disabled>เลือกจังหวัด</option>
                    <option v-for="province in provinces" :key="province.id" :value="province.id">
                        {{ province.name }}
                    </option>
                </select>
            </div>

            <!-- ประเภททะเบียน -->
            <div class="mb-3">
                <label for="licenseType" class="form-label">กลุ่มทะเบียน</label>
                <select id="licenseType" class="form-select" v-model="form.groupLicenseId">
                    <option value="" disabled>เลือกกลุ่มทะเบียน</option>
                    <option v-for="group in licenseGroups" :key="group.id" :value="group.id">
                        {{ group.licenseName }}
                    </option>
                </select>
            </div>

            <!-- หน่วยงานเจ้าของข้อมูล -->
            <div class="mb-3">
                <label for="department" class="form-label">หน่วยงานเจ้าของข้อมูล</label>
                <select id="department" class="form-select" v-model="form.departmentId">
                    <option value="" disabled>เลือกหน่วยงาน</option>
                    <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                        {{ dept.name }}
                    </option>
                </select>
            </div>

            <!-- สถานะข้อมูล -->
            <div class="mb-3">
                <label for="status" class="form-label">สถานะข้อมูล</label>
                <select id="status" class="form-select" v-model="form.status">
                    <option value="ทุกสถานะ">ทุกสถานะ</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" /> ค้นหา
                </button>
                <button type="button" class="btn btn-secondary" @click="resetForm">
                    ล้างข้อมูล
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                regPrefix: '',
                licenseNumber: '',
                provinceId: '',
                groupLicenseId: '',
                departmentId: '',
                status: 'ทุกสถานะ'
            },
            provinces: [],
            licenseGroups: [],
            departments: []
        };
    },
    mounted() {
        this.fetchProvince();
        this.fetchLicenseGroups();
        this.fetchDepartments();
    },
    methods: {
        async fetchProvince() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/administrator/province`);
                this.provinces = response.data.data;
            } catch (error) {
                console.error('Error loading provinces:', error);
            }
        },
        async fetchLicenseGroups() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/licenses/groupLicense`);
                this.licenseGroups = response.data.data;
            } catch (error) {
                console.error('Error fetching license groups:', error);
            }
        },
        async fetchDepartments() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/licenses/department`);
                this.departments = response.data.data;
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        },
        handleSearch() {
            this.$emit('search', this.form);
        },
        resetForm() {
            // รีเซ็ตข้อมูลฟอร์ม
            this.form = {
                regPrefix: '',
                licenseNumber: '',
                provinceId: '',
                groupLicenseId: '',
                departmentId: '',
                status: 'ทุกสถานะ'
            };

            this.handleSearch();
        }
    }
};
</script>

<style scoped>
.search-form {
    max-width: 400px;
}

.form-label {
    font-weight: bold;
}

.form-control,
.form-select {
    height: 45px;
}

.btn {
    width: 48%;
}
</style>
