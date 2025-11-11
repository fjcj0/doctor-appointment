/*IMAGES*/
export const logo = '/logo.png';
export const headerImage = '/backgrounds/header_img-DhAi3lLA.png';
export const peopleImage = '/people/group_profiles-BCL6AVF5.png';
export const userLogo = '/user.png';
export const aboutImage = '/backgrounds/about_image-MG9zrc7b.png';
export const contactImage = '/backgrounds/contact_image-IJu_19v_.png';
export const appointmentImage = '/backgrounds/appointment_img-DzbZlMsi.png';
export const cancelIcon = '/cancel_icon.svg';
export const tickIcon = '/tick_icon.svg';
export const appointmentIcon = '/appointments_icon.svg';
export const doctorIcon = '/doctor_icon.svg';
export const earningIcon = '/earning_icon.svg';
export const patientIcon = '/patient_icon.svg';
export const patientsIcon = '/patients_icon.svg';
export const uploadAreaIcon = '/upload_area.svg';
export const blueTick = '/blueTick.svg';
export const closeEye = '/eye.png';
export const openEye = '/visible.png';
export const warningIcon = '/warning.png';
export const circleIcon = '/circle.png';
export const arrowDownIcon = '/down-arrow.png';
export const filterIcon = '/filter.svg';
/**/

/*LINKS*/
export const headerLinks = [
    {
        text: 'HOME',
        direct: '/',
    },
    {
        text: 'ALL DOCTORS',
        direct: '/all-doctors',
    },
    {
        text: 'ABOUT',
        direct: '/about'
    },
    {
        text: 'CONTACT',
        direct: '/contact',
    }
];
export const doctorLinks = [
    {
        text: 'Dashboard',
        icon: '/dashboard-icons/home_icon.svg',
        direct: '/dashboard-doctor',
    },
    {
        text: 'Appointments',
        icon: '/dashboard-icons/appointment_icon.svg',
        direct: '/dashboard-doctor/appointments',
    },
    {
        text: 'Profile',
        icon: '/dashboard-icons/people_icon.svg',
        direct: '/dashboard-doctor/profile',
    }
];
export const adminLinks = [
    {
        text: 'Dashboard',
        icon: '/dashboard-icons/home_icon.svg',
        direct: '/dashboard-admin',
    },
    {
        text: 'Appointments',
        icon: '/dashboard-icons/appointment_icon.svg',
        direct: '/dashboard-admin/appointments',
    },
    {
        text: 'Add Doctor',
        icon: '/dashboard-icons/add_icon.svg',
        direct: '/dashboard-admin/add-doctor',
    },
    {
        text: 'Doctors List',
        icon: '/dashboard-icons/people_icon.svg',
        direct: '/dashboard-admin/doctors-list',
    }
];
export const userLinks = [
    {
        text: 'My Profile',
        direct: '/my-profile',
        isButton: false,
    },
    {
        text: 'My Appointmets',
        direct: '/my-appointments',
        isButton: false,
    },
    {
        text: 'Logout',
        isButton: true
    }
];
export const footerLinks = {
    company: {
        title: 'COMPANY',
        links: [
            {
                text: 'Home',
                direct: '/',
            },
            {
                text: 'About Us',
                direct: '/',
            },
            {
                text: 'Delivery',
                direct: '/',
            },
            {
                text: 'Privacy Policy',
                direct: '/',
            }
        ]
    },
    GET_IN_TOUCH: {
        title: 'GET IN TOUCH',
        lists: [
            {
                text: '+1-22-214-24',
            },
            {
                text: 'doctor_123@gmail.com',
            }
        ],
    },
};
/**/

/*LISTS*/
export const doctors = [
    {
        name: 'Dr. Richard James',
        image: '/doctors/doc1.png',
        available: true,
        specail: 'General physician',
    },
    {
        name: 'Dr. Sarah Chen',
        image: '/doctors/doc2.png',
        available: true,
        specail: 'Cardiologist',
    },
    {
        name: 'Dr. Michael Rodriguez',
        image: '/doctors/doc3.png',
        available: false,
        specail: 'Neurologist',
    },
    {
        name: 'Dr. Emily Watson',
        image: '/doctors/doc4.png',
        available: true,
        specail: 'Pediatrician',
    },
    {
        name: 'Dr. James Wilson',
        image: '/doctors/doc5.png',
        available: true,
        specail: 'Orthopedic Surgeon',
    },
    {
        name: 'Dr. Lisa Thompson',
        image: '/doctors/doc6.png',
        available: false,
        specail: 'Dermatologist',
    },
    {
        name: 'Dr. Robert Kim',
        image: '/doctors/doc7.png',
        available: true,
        specail: 'Psychiatrist',
    },
    {
        name: 'Dr. Amanda Park',
        image: '/doctors/doc8.png',
        available: true,
        specail: 'Gynecologist',
    },
    {
        name: 'Dr. David Miller',
        image: '/doctors/doc9.png',
        available: false,
        specail: 'Oncologist',
    },
    {
        name: 'Dr. Jennifer Lopez',
        image: '/doctors/doc10.png',
        available: true,
        specail: 'Endocrinologist',
    },
    {
        name: 'Dr. Kevin Patel',
        image: '/doctors/doc11.png',
        available: true,
        specail: 'Gastroenterologist',
    },
    {
        name: 'Dr. Maria Garcia',
        image: '/doctors/doc12.png',
        available: false,
        specail: 'Pulmonologist',
    },
    {
        name: 'Dr. Thomas Baker',
        image: '/doctors/doc13.png',
        available: true,
        specail: 'Rheumatologist',
    },
    {
        name: 'Dr. Samantha Lee',
        image: '/doctors/doc14.png',
        available: true,
        specail: 'Nephrologist',
    },
    {
        name: 'Dr. Christopher Wong',
        image: '/doctors/doc15.png',
        available: false,
        specail: 'Urologist',
    }
];
export const specialties = [
    {
        text: 'General Physician',
        image: '/icons/icon1.svg',
    },
    {
        text: 'Cardiologist',
        image: '/icons/icon2.svg',
    },
    {
        text: 'Neurologist',
        image: '/icons/icon3.svg',
    },
    {
        text: 'Pediatrician',
        image: '/icons/icon4.svg',
    },
    {
        text: 'Orthopedic Surgeon',
        image: '/icons/icon5.svg',
    },
    {
        text: 'Dermatologist',
        image: '/icons/icon6.svg',
    },
];
export const appointments = [
    {
        pateint: 'Ali',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=800',
        payment: 'online',
        age: 31,
        Date: '5 Oct 2024, 12:00PM',
        Fee: '$50.5',
        status: 'pending',
    },
    {
        pateint: 'Sarah Johnson',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        payment: 'cash',
        age: 28,
        Date: '6 Oct 2024, 2:30PM',
        Fee: '$65.0',
        status: 'confirmed',
    },
    {
        pateint: 'Michael Chen',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        payment: 'insurance',
        age: 45,
        Date: '7 Oct 2024, 10:15AM',
        Fee: '$120.0',
        status: 'completed',
    },
    {
        pateint: 'Emma Rodriguez',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=800',
        payment: 'online',
        age: 35,
        Date: '8 Oct 2024, 4:45PM',
        Fee: '$75.5',
        status: 'cancelled',
    }
];
export const dates = [
    {
        day: 'MON',
        month: '10',
    },
    {
        day: 'TUE',
        month: '11',
    },
    {
        day: 'WED',
        month: '12',
    },
    {
        day: 'THU',
        month: '13',
    },
    {
        day: 'FRI',
        month: '14',
    },
    {
        day: 'SAT',
        month: '15',
    },
    {
        day: 'SUN',
        month: '16',
    }
];
export const times = [
    '10:00 am',
    '10:30 am',
    '11:00 am',
    '11:30 am',
    '12:00 pm',
    '12:30 pm',
    '01:00 pm',
    '01:30 pm',
    '02:00 pm',
    '02:30 pm',
    '03:00 pm',
    '03:30 pm',
    '04:00 pm',
    '04:30 pm',
    '05:00 pm',
    '05:30 pm',
    '06:00 pm',
    '06:30 pm',
    '07:00 pm',
    '07:30 pm',
    '08:00 pm',
    '08:30 pm'
];
/**/
/*INFORMATION*/
export const doctorInformation = [
    {
        name: 'Dr. Richard James',
        specail: 'MBBS - General physician',
        year_experince: 4,
        about: 'A dedicated General Physician focused on providing comprehensive primary care. Dr. James is committed to accurate diagnosis and building trusting, long-term relationships with his patients.',
        fee: '$50',
    }
];
/**/