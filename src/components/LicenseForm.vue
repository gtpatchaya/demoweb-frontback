<template>

    <div class="d-flex flex-column">
        <h3 class="text-white">{{ isEditMode ? 'แก้ไขทะเบียนพิเศษ' : 'เพิ่มทะเบียนพิเศษ' }}</h3>
        <div class="d-flex justify-content-between p-3 primary-border">
            <div class="col-lg-9 col-md-12">
                <form @submit.prevent="handleSubmit">
                    <div class="row">
                        <div class="col-lg-4 col-md-6">
                            <label class="text-white" for="regPrefix">หมวดอักษร*</label>
                            <input type="text" class="form-control" id="regPrefix" v-model="form.regPrefix" required />
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <label class="text-white" for="licenseNumber">ป้ายทะเบียน*</label>
                            <input type="text" class="form-control" id="licenseNumber" v-model="form.licenseNumber"
                                required />
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <label class="text-white" for="province">จังหวัด*</label>
                            <select class="form-control" id="provinceId" v-model="form.provinceId" required>
                                <option value="">กรุณาเลือก</option>
                                <option v-for="p in province" :key="p.id" :value="p.id">{{ p.name }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-4 col-md-6">
                            <label class="text-white" for="groupLicense">กลุ่มทะเบียน*</label>
                            <select class="form-control" id="groupLicense" v-model="form.groupLicenseId" required>
                                <option value="">กรุณาเลือก</option>
                                <option v-for="group in licenseGroups" :key="group.id" :value="group.id">{{
                                    group.licenseName }}</option>
                            </select>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-4 col-md-6">
                            <label class="text-white" for="caseNumber">หมายเลขคดี</label>
                            <input type="text" class="form-control" id="caseNumber" v-model="form.caseNumber" />
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <label class="text-white" for="warrantIssueDate">วันที่ออกหมายจับ</label>
                            <input type="date" class="form-control" id="warrantIssueDate"
                                v-model="form.warrantIssueDate" />
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <label class="text-white" for="warrantExpiredDate">วันที่สิ้นสุดออกหมายจับ</label>
                            <input type="date" class="form-control" id="warrantExpiredDate"
                                v-model="form.warrantExpiredDate" />
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-12 col-md-12">
                            <label class="text-white" for="offenseDetails">พฤติการณ์</label>
                            <textarea class="form-control" id="offenseDetails" v-model="form.offenseDetails"></textarea>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-4 col-md-6">
                            <label class="text-white" for="ownerName">เจ้าของข้อมูล</label>
                            <input type="text" class="form-control" id="ownerName" v-model="form.ownerName" />
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <label class="text-white" for="department">หน่วยงาน</label>
                            <select class="form-control" id="department" v-model="form.departmentId" required>
                                <option value="">กรุณาเลือก</option>
                                <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}
                                </option>
                            </select>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <label class="text-white" for="contractNumber">เบอร์ติดต่อ</label>
                            <input type="text" class="form-control" id="contractNumber" v-model="form.contractNumber" />
                        </div>
                    </div>

                    <div class="form-check mt-3">
                        <input class="form-check-input" type="checkbox" v-model="form.isActive" id="isActive">
                        <label class="form-check-label text-white" for="isActive">Active</label>
                    </div>

                    <div class="d-flex justify-content-end mt-4">
                        <button type="submit" class="btn btn-primary">
                            <font-awesome-icon :icon="['fas', 'floppy-disk']" class="me-2" />{{ isEditMode ?
                                'บันทึกการแก้ไข' : 'บันทึก' }}
                        </button>
                        <button type="button" class="btn btn-secondary ms-2" @click="cancel">ยกเลิก</button>
                    </div>
                </form>
            </div>

            <div style="border: solid; border-width: 1px;" class="ms-3"></div>


            <div class="col-lg-3 col-md-12 mt-3 mt-lg-0">
                <div class="card-body text-center m-3 p-2 rounded">
                    <p for="upload-file" class="text-white">อัพโหลดไฟล์</p>

                    <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="img-fluid mb-3 rounded"
                        style="width: 150px; height: 150px; object-fit: contain;" />

                    <div style="height: 150px;" v-else class="text-white">{{ uploadedFiles.length > 0 ?
                        truncateFileName(uploadedFiles[uploadedFiles.length - 1].name) : 'ไม่มีไฟล์ที่อัพโหลด' }}
                    </div>

                    <div class="input-group">
                        <input type="file" class="form-control" @change="onFileChange" for="upload-file" />
                        <button class="btn btn-primary" style="height: 38px;" @click="uploadFile">Upload</button>
                    </div>

                    <div style="height: 300px; overflow-y: auto;" v-if="uploadedFiles.length">
                        <table class="table table-dark mt-3">
                            <thead>
                                <tr>
                                    <th>ชื่อไฟล์</th>
                                    <th>วันที่อัปโหลด</th>
                                    <th>ลบ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(file, index) in uploadedFiles.filter(x => x.status !== 'delete')"
                                    :key="index">
                                    <td><a class="text-white" href="javascript:void(0)" @click="previewFile(file)">{{
                                        file.name }}</a></td>
                                    <td>{{ file.date }}</td>
                                    <td><font-awesome-icon :icon="['fas', 'trash-can']" style="cursor: pointer;"
                                            @click.stop="deleteFile(file, index)" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        ไม่มีข้อมูล
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { truncateFileName } from '../../utils/stringUtils';
import { attachmentFileEnums } from '@/enums/attachmentFileEnums';
import Swal from 'sweetalert2'

export default {
    props: ['id'],
    data() {
        return {
            form: {
                regPrefix: '',
                licenseNumber: '',
                province: '',
                groupLicense: '',
                caseNumber: '',
                warrantIssueDate: '',
                warrantExpiredDate: '',
                offenseDetails: '',
                ownerName: '',
                department: '',
                contractNumber: '',
                isActive: false,
                provinceId: ''
            },
            isEditMode: false,
            licenseGroups: [],
            departments: [],
            province: [],
            imageUrl: null,
            uploadedFiles: [],
            uploadedFileTemp: []
        };
    },
    mounted() {
        this.fetchLicenseGroups();
        this.fetchDepartments();
        this.fetchProvince();

        if (this.id) {
            this.isEditMode = true;
            this.loadLicenseData();
            this.fetchUploadedFiles();
        }
    },
    methods: {
        truncateFileName,
        async fetchProvince() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/administrator/province`);
                this.province = response.data.data;
            } catch (error) {
                console.error('Error loading license data:', error);
            }
        },

        async loadLicenseData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/licenses/${this.id}`);
                this.form = response.data.data;
            } catch (error) {
                console.error('Error loading license data:', error);
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
        async handleSubmit() {
            try {
                const licenseData = this.getLicenseData();

                if (this.uploadedFiles && this.uploadedFiles.length > 0) {
                    licenseData.uploadedFiles = this.uploadedFiles;
                }

                if (this.isEditMode) {
                    await this.updateLicense(licenseData);
                } else {
                    await this.createLicense(licenseData);
                }

                Swal.fire({
                    title: "บันทึกสำเร็จ",
                    text: "ข้อมูลถูกบันทึกเรียบร้อย",
                    icon: "success",
                    timer: 2000, // หน่วงเวลา 2 วินาที (2000 มิลลิวินาที)
                    showConfirmButton: false, // ไม่แสดงปุ่ม OK
                    willClose: () => {
                        this.$router.push('/SpecialLicense'); // เมื่อปิดข้อความแจ้งเตือน ให้ router push
                    }
                });


            } catch (error) {
                console.error('Error submitting form:', error);
                alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
            }
        },

        getLicenseData() {
            return {
                regPrefix: this.form.regPrefix,
                licenseNumber: this.form.licenseNumber,
                groupLicenseId: this.form.groupLicenseId,
                departmentId: this.form.departmentId,
                provinceId: this.form.provinceId,
                caseNumber: this.form.caseNumber,
                warrantIssueDate: this.form.warrantIssueDate,
                warrantExpiredDate: this.form.warrantExpiredDate,
                offenseDetails: this.form.offenseDetails,
                ownerName: this.form.ownerName,
                isActive: this.form.isActive,
                contractNumber: this.form.contractNumber,
                status: "Valid",
            };
        },

        async createLicense(licenseData) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/licenses`, licenseData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Create License Response:', response.data);
            } catch (error) {
                throw new Error('Error creating license: ' + error.message);
            }
        },

        async updateLicense(licenseData) {
            console.log(licenseData)
            try {
                const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/licenses/${this.id}`, licenseData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log('Update License Response:', response.data);
            } catch (error) {
                throw new Error('Error updating license: ' + error.message);
            }
        },

        cancel() {
            this.$router.push('/SpecialLicense');
        },

        onFileChange(event) {
            const file = event.target.files[0];
            const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (file && imageExtensions.includes(fileExtension)) {
                this.imageUrl = URL.createObjectURL(file);
            } else {
                this.imageUrl = null;
            }
        },
        async fetchUploadedFiles() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/licenses/${this.id}/attachment`);
                this.uploadedFiles = response.data.map(file => ({
                    id: file.id,
                    name: file.fileName,
                    date: new Date(file.createdAt).toLocaleDateString(),
                    url: file.filePath,
                    order: file.order,
                    status: attachmentFileEnums.EXISTING
                }));

                this.uploadedFileTemp = { ...this.uploadedFiles };
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        },

        async uploadFile() {
            const fileInput = this.$el.querySelector('input[type="file"]');
            const file = fileInput.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                if (this.isEditMode) {
                    formData.append('licenseId', this.id);
                }

                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    });

                    this.uploadedFiles.push({
                        name: response.data.fileName,
                        date: new Date().toLocaleDateString(),
                        url: `${import.meta.env.VITE_API_URL}/uploads/${response.data.fileName}`,
                        order: response.data.order,
                        status: attachmentFileEnums.NEW
                    });

                    this.uploadedFileTemp = { ...this.uploadedFiles };

                    fileInput.value = '';
                    const fileExtension = response.data.fileName.split('.').pop().toLowerCase();

                    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                        this.imageUrl = `${import.meta.env.VITE_API_URL}/uploads/${response.data.fileName}`;
                    } else {
                        this.imageUrl = null;
                    }

                } catch (error) {
                    console.error('Error uploading file:', error);
                    alert('เกิดข้อผิดพลาดในการอัปโหลดไฟล์');
                }
            }
        },

        async deleteFile(file, index) {
            try {
                file.status = attachmentFileEnums.DELETE;
                this.imageUrl = null;
            } catch (error) {
                console.error('Error deleting file:', error);
                alert('เกิดข้อผิดพลาดในการลบไฟล์');
            }
        },

        previewFile(file) {
            const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (imageExtensions.includes(fileExtension)) {
                this.imageUrl = file.url;
            } else {
                this.imageUrl = null;
            }
        }

    }
};
</script>

<style scoped>
.form-control {
    margin-bottom: 1rem;
}
</style>
