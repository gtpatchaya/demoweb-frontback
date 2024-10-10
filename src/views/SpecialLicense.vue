<template>
    <div class="mt-1">
        <div class="row">
            <div class="col-lg-9 col-md-9">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3 class="text-white">รายการทะเบียนพิเศษ</h3>
                    <div>
                        <button class="btn" style="background-color: white; color: #2B9BED;">
                            <font-awesome-icon :icon="['fas', 'upload']" class="me-2" />นำเข้าข้อมูล</button>
                        <button class="btn ms-2" style="background-color: #2B9BED; color:white;"
                            @click="goToCreate"><font-awesome-icon :icon="['fas', 'plus']"
                                class="me-2" />เพิ่มทะเบียนพิเศษ</button>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-dark table-striped table-hover text-center">
                        <thead>
                            <tr>
                                <th scope="col">ทะเบียน</th>
                                <th scope="col">รูป</th>
                                <th scope="col">กลุ่มทะเบียน</th>
                                <th scope="col">วันที่เพิ่ม</th>
                                <th scope="col">วันที่แก้ไข</th>
                                <th scope="col">เจ้าของข้อมูล</th>
                                <th scope="col">หน่วยงาน</th>
                                <th scope="col">สถานะ</th>
                                <th scope="col">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="licenses.length === 0">
                                <td colspan="9" class="align-middle">ไม่มีข้อมูล</td>
                            </tr>
                            <tr v-for="(license, index) in licenses" :key="index">
                                <td class="align-middle">{{ (license.regPrefix || '') + (license.licenseNumber || '') }}
                                </td>
                                <td class="align-middle">
                                    <div v-if="license.attachments && license.attachments.length > 0">
                                        <img v-for="(attachment, idx) in license.attachments.slice(0, 2)" :key="idx"
                                            :src="attachment.filePath" alt="Attachment Image" width="120" height="50"
                                            class="me-2" />
                                    </div>
                                </td>
                                <td class="align-middle">{{ license.groupLicense.licenseName }}</td>
                                <td class="align-middle">{{ formatDate(license.createdAt) }}</td>
                                <td class="align-middle">{{ formatDate(license.updatedAt) }}</td>
                                <td class="align-middle">{{ license.ownerName }}</td>
                                <td class="align-middle">{{ license.department.name }}</td>
                                <td class="align-middle">
                                    <span :class="license.isActive ? 'badge bg-success' : 'badge bg-danger'">
                                        {{ license.isActive ? 'Active' : 'Inactive' }}
                                    </span>
                                </td>
                                <td class="align-middle">
                                    <font-awesome-icon style="cursor: pointer;" @click="goToEdit(license.id)"
                                        class="pe-auto" :icon="['fas', 'pen']" />
                                    <font-awesome-icon style="cursor: pointer;" class="ms-3"
                                        @click="confirmDelete(license)" :icon="['fas', 'trash-can']" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-lg-3 col-md-12 mt-3 mt-lg-0">
                <SearchForm @search="fetchLicenses" />
            </div>
        </div>
    </div>
</template>

<script>
import SearchForm from '@/components/SearchForm.vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

export default {
    name: 'SpecialLicense',
    data() {
        return {
            licenses: [],
        };
    },
    components: {
        SearchForm,
    },
    mounted() {
        this.fetchLicenses();
    },
    methods: {
        async fetchLicenses(searchParams = null) {
            try {
                let url = `${import.meta.env.VITE_API_URL}/api/licenses`;
                if (searchParams) {
                    const query = new URLSearchParams(searchParams).toString();
                    url += `?${query}`;
                }
                const response = await axios.get(url);
                this.licenses = response.data.data;
            } catch (error) {
                console.error('Error fetching licenses:', error);
            }
        },
        goToCreate() {
            this.$router.push('/SpecialLicense/create');
        },
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
        },
        goToEdit(id) {
            this.$router.push(`/SpecialLicense/edit/${id}`);
        },
        confirmDelete(license) {
            Swal.fire({
                title: `คุณต้องการลบข้อมูลทะเบียน ${license.regPrefix}${license.licenseNumber} หรือไม่?`,
                text: 'การลบนี้จะไม่สามารถย้อนกลับได้',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'ใช่, ลบเลย!',
                cancelButtonText: 'ไม่ใช่',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await this.deleteLicense(license.id);
                        Swal.fire('ลบแล้ว!', 'ข้อมูลได้ถูกลบเรียบร้อยแล้ว', 'success');
                        this.fetchLicenses();
                    } catch (error) {
                        Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถลบข้อมูลได้', 'error');
                    }
                }
            });
        },
        async deleteLicense(id) {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/licenses/${id}`);
                return response.data;
            } catch (error) {
                throw new Error('Error deleting license');
            }
        },
    },
};
</script>

<style scoped>
table tbody tr {
    height: 80px;
    border-bottom: 2.3px dotted #b6b6b6;
}

.bg-success {
    background-color: #4DB64C !important;
}
</style>
