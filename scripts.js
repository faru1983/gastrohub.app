
        const { createApp, ref, computed } = Vue;
        
        createApp({
            setup() {
                // Estado general
                const currentTab = ref('inicio');
                const tabs = [
                    { id: 'inicio', name: 'Inicio', icon: 'fas fa-home' },
                    { id: 'carta', name: 'Carta', icon: 'fas fa-book-open' },
                    { id: 'fidelizacion', name: 'Fidelización', icon: 'fas fa-trophy' },
                    { id: 'reservas', name: 'Reservas', icon: 'fas fa-calendar-check' },
                    { id: 'perfil', name: 'Mi Perfil', icon: 'fas fa-user-circle' }
                ];
                
                // Estado para la pestaña Carta
                const categories = [
                    { id: 'all', name: 'Todas' },
                    { id: 'entradas', name: 'Entradas' },
                    { id: 'principales', name: 'Platos Principales' },
                    { id: 'postres', name: 'Postres' },
                    { id: 'bebidas', name: 'Bebidas' }
                ];
                const selectedCategory = ref('all');
                const products = [
                    {
                        id: 1,
                        name: 'Ceviche de Salmón',
                        description: 'Salmón fresco marinado en limón con cebolla morada, cilantro y camote',
                        price: 8900,
                        category: 'entradas',
                        image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        id: 2,
                        name: 'Carpaccio de Res',
                        description: 'Finas láminas de res con rúcula, alcaparras y parmesano',
                        price: 10500,
                        category: 'entradas',
                        image: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        id: 3,
                        name: 'Risotto de Hongos',
                        description: 'Arroz cremoso con mezcla de hongos silvestres y trufa',
                        price: 12500,
                        category: 'principales',
                        image: 'https://images.unsplash.com/photo-1581073746562-e7fd2422f0eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        id: 4,
                        name: 'Lomo a la Pimienta',
                        description: 'Lomo de res con salsa de pimienta, acompañado de papas rústicas',
                        price: 15900,
                        category: 'principales',
                        image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        id: 5,
                        name: 'Tiramisú Clásico',
                        description: 'Postre italiano con capas de bizcocho, café y crema de mascarpone',
                        price: 6900,
                        category: 'postres',
                        image: 'https://images.unsplash.com/photo-1631206753348-db44968fd440?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    },
                    {
                        id: 6,
                        name: 'Mojito Clásico',
                        description: 'Ron, azúcar, lima, hierbabuena y soda',
                        price: 6500,
                        category: 'bebidas',
                        image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                    }
                ];
                const filteredProducts = computed(() => {
                    if (selectedCategory.value === 'all') return products;
                    return products.filter(p => p.category === selectedCategory.value);
                });
                const showImageModal = ref(false);
                const currentImage = ref('');
                
                const openImageModal = (image) => {
                    currentImage.value = image;
                    showImageModal.value = true;
                };
                
                // Estado para la pestaña Fidelización
                const isLoggedIn = ref(false);
                const showLoginModal = ref(false);
                const showRegisterModal = ref(false);
                const cameraActive = ref(false);
                const visitReason = ref('');
                const visits = [
                    { id: 1, date: '15/10/2023', points: 3, details: 'Cena con amigos' },
                    { id: 2, date: '02/10/2023', points: 2, details: 'Almuerzo de trabajo' },
                    { id: 3, date: '25/09/2023', points: 3, details: 'Celebración de cumpleaños' }
                ];
                
                const login = () => {
                    isLoggedIn.value = true;
                    showLoginModal.value = false;
                    isProfileLoggedIn.value = true; // <-- Añadido
                };
                
                const register = () => {
                    isLoggedIn.value = true;
                    showRegisterModal.value = false;
                    isProfileLoggedIn.value = true; // <-- Añadido
                };
                
                const logout = () => {
                    isLoggedIn.value = false;
                    cameraActive.value = false;
                    visitReason.value = '';
                };
                
                // Estado para la pestaña Reservas
                const timeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00'];
                const reservation = ref({
                    date: '',
                    time: '',
                    people: '',
                    zone: '',
                    name: '',
                    surname: '',
                    birthdate: '',
                    commune: '',
                    email: '',
                    phone: ''
                });
                
                const fillWithSampleData = () => {
                    // Solo llena los datos personales, no los de reserva
                    reservation.value.name = 'Ana';
                    reservation.value.surname = 'García López';
                    reservation.value.birthdate = '1990-05-15';
                    reservation.value.commune = 'Providencia';
                    reservation.value.email = 'ana.garcia@ejemplo.com';
                    reservation.value.phone = '+56987654321';
                };
                
                const sendWhatsAppReservation = () => {
                    if (!reservation.value.date || !reservation.value.time || !reservation.value.people || !reservation.value.zone) {
                        alert('Por favor complete los datos de la reserva');
                        return;
                    }
                    const message = `Hola, quisiera reservar una mesa para ${reservation.value.people} personas el ${reservation.value.date} a las ${reservation.value.time} en la zona ${reservation.value.zone}. Mis datos: ${reservation.value.name} ${reservation.value.surname}, ${reservation.value.phone}`;
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/56966755025?text=${encodedMessage}`, '_blank');
                };
                
                // Estado para la pestaña Perfil
                const isProfileLoggedIn = ref(false);
                const user = ref({
                    name: 'María',
                    surname: 'Fernández González',
                    birthdate: '1988-07-22',
                    commune: 'Las Condes',
                    email: 'maria.fernandez@ejemplo.com',
                    phone: '+56912345678',
                    memberSince: '15/03/2023',
                    promoMessages: true
                });
                const editProfile = ref(false);
                const bookings = [
                    { id: 1, date: '20/11/2023', time: '20:00', people: 4, zone: 'Terraza', status: 'confirmada' },
                    { id: 2, date: '05/12/2023', time: '19:30', people: 6, zone: 'Interior', status: 'pendiente' }
                ];
                const userVisits = [
                    { id: 1, date: '15/10/2023', points: 3, details: 'Cena con amigos' },
                    { id: 2, date: '02/10/2023', points: 2, details: 'Almuerzo de trabajo' },
                    { id: 3, date: '25/09/2023', points: 3, details: 'Celebración de cumpleaños' }
                ];
                
                const saveProfile = () => {
                    editProfile.value = false;
                };
                
                const editBooking = (booking) => {
                    // Simular edición de reserva
                    alert(`Editando reserva para el ${booking.date} a las ${booking.time}`);
                };
                
                const profileLogin = () => {
                    isProfileLoggedIn.value = true;
                };
                
                const profileRegister = () => {
                    isProfileLoggedIn.value = true;
                };
                
                const profileLogout = () => {
                    isProfileLoggedIn.value = false;
                };
                
                return {
                    currentTab,
                    tabs,
                    categories,
                    selectedCategory,
                    products,
                    filteredProducts,
                    showImageModal,
                    currentImage,
                    openImageModal,
                    isLoggedIn,
                    showLoginModal,
                    showRegisterModal,
                    cameraActive,
                    visitReason,
                    visits,
                    login,
                    register,
                    logout,
                    timeSlots,
                    reservation,
                    fillWithSampleData,
                    sendWhatsAppReservation,
                    user,
                    editProfile,
                    bookings,
                    userVisits,
                    saveProfile,
                    editBooking,
                    isProfileLoggedIn,
                    profileLogin,
                    profileRegister,
                    profileLogout
                };
            }
        }).mount('#app');