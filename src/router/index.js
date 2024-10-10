import { createRouter, createWebHistory } from 'vue-router';
import SpecialLicense from '@/views/SpecialLicense.vue';
import LicenseForm from '@/components/LicenseForm.vue';

const routes = [
    {
        path: '/',
        children: [
            {
                path: 'SpecialLicense',
                name: 'SpecialLicense',
                component: SpecialLicense,
            },
        ],
    },
    {
        path: '/SpecialLicense/create',
        name: 'LicenseForm',
        component: LicenseForm, // ฟอร์มสำหรับเพิ่มข้อมูลใหม่
    },
    {
        path: '/SpecialLicense/edit/:id',
        name: 'EditLicense',
        component: LicenseForm,
        props: true
    }
];

// สร้าง router instance
const router = createRouter({
    history: createWebHistory(),  // ใช้ history mode
    routes,
});

export default router;
