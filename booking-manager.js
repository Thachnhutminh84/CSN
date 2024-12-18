class BookingManager {
    constructor() {
        this.bookings = {};
    }

    showForm(siteId) {
        const formHtml = `
            <div class="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50" 
                 id="modal_${siteId}"
                 onclick="bookingManager.handleModalClick(event, '${siteId}')">
                <div class="relative bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md mx-4">
                    <!-- Header -->
                    <div class="bg-white px-6 py-4 border-b">
                        <div class="flex justify-between items-center">
                            <div>
                                <h3 class="text-xl font-bold text-gray-800">Đặt Lịch Tham Quan</h3>
                                <p class="text-sm text-gray-500 mt-1">Vui lòng điền đầy đủ thông tin bên dưới</p>
                            </div>
                            <button onclick="bookingManager.closeForm('${siteId}')" 
                                    class="text-gray-400 hover:text-gray-500 focus:outline-none">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Form Content -->
                    <div class="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                        <form id="bookingForm_${siteId}" onsubmit="bookingManager.saveBooking(event, '${siteId}')" class="space-y-4">
                            <!-- Thông tin cá nhân -->
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-user mr-2"></i>Họ và tên
                                    </label>
                                    <input type="text" id="name_${siteId}" required placeholder="Nhập họ và tên của bạn"
                                        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-envelope mr-2"></i>Email
                                    </label>
                                    <input type="email" id="email_${siteId}" required placeholder="example@email.com"
                                        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-phone mr-2"></i>Số điện thoại
                                    </label>
                                    <input type="tel" id="phone_${siteId}" required placeholder="0xxxxxxxxx"
                                        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                </div>

                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                                            <i class="fas fa-calendar mr-2"></i>Ngày tham quan
                                        </label>
                                        <input type="date" id="visitDate_${siteId}" required
                                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-gray-700 mb-2">
                                            <i class="fas fa-clock mr-2"></i>Thời gian
                                        </label>
                                        <input type="time" id="visitTime_${siteId}" required
                                            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-users mr-2"></i>Số người tham quan
                                    </label>
                                    <input type="number" id="visitors_${siteId}" required min="1" placeholder="Nhập số người"
                                        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                                        <i class="fas fa-comment-alt mr-2"></i>Ghi chú
                                    </label>
                                    <textarea id="notes_${siteId}" rows="3" placeholder="Nhập ghi chú nếu cần"
                                        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- Footer Buttons -->
                    <div class="bg-gray-50 px-6 py-4 border-t">
                        <div class="flex justify-end space-x-3">
                            <button type="button" onclick="bookingManager.closeForm('${siteId}')"
                                class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                                <i class="fas fa-times mr-2"></i>Hủy
                            </button>
                            <button type="submit" form="bookingForm_${siteId}"
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <i class="fas fa-check mr-2"></i>Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;

        document.body.insertAdjacentHTML('beforeend', formHtml);
    }

    handleModalClick(event, siteId) {
        const modalContent = event.target.closest('.bg-white');
        if (!modalContent) {
            this.closeForm(siteId);
        }
    }

    closeForm(siteId) {
        const modal = document.getElementById(`modal_${siteId}`);
        if (modal) {
            modal.remove();
        }
    }

    saveBooking(event, siteId) {
        event.preventDefault();

        const booking = {
            name: document.getElementById(`name_${siteId}`).value,
            email: document.getElementById(`email_${siteId}`).value,
            phone: document.getElementById(`phone_${siteId}`).value,
            visitDate: document.getElementById(`visitDate_${siteId}`).value,
            visitTime: document.getElementById(`visitTime_${siteId}`).value,
            visitors: document.getElementById(`visitors_${siteId}`).value,
            notes: document.getElementById(`notes_${siteId}`).value,
            timestamp: new Date().toLocaleString('vi-VN')
        };

        let bookings = JSON.parse(localStorage.getItem(`tourBookings_${siteId}`) || '[]');
        bookings.push(booking);
        localStorage.setItem(`tourBookings_${siteId}`, JSON.stringify(bookings));

        event.target.reset();
        alert('Đặt lịch tham quan thành công!');
        this.closeForm(siteId);
    }

    displayBookings(siteId) {
        const bookings = JSON.parse(localStorage.getItem(`tourBookings_${siteId}`) || '[]');
        const bookingList = document.getElementById(`bookingList_${siteId}`);
        bookingList.innerHTML = '';

        bookings.forEach((booking, index) => {
            const bookingDiv = document.createElement('div');
            bookingDiv.className = 'p-4 border rounded bg-gray-50';
            bookingDiv.innerHTML = `
          <p class="font-semibold">${booking.name}</p>
          <p>Email: ${booking.email}</p>
          <p>SĐT: ${booking.phone}</p>
          <p>Ngày tham quan: ${booking.visitDate}</p>
          <p>Thời gian: ${booking.visitTime}</p>
          <p>Số người: ${booking.visitors}</p>
          <p>Ghi chú: ${booking.notes}</p>
          <p class="text-sm text-gray-500">Đặt lúc: ${booking.timestamp}</p>
          <button onclick="bookingManager.deleteBooking('${siteId}', ${index})" 
                  class="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            Xóa lịch đặt
          </button>
        `;
            bookingList.appendChild(bookingDiv);
        });
    }

    deleteBooking(siteId, index) {
        if (confirm('Bạn có chắc chắn muốn xóa lịch đặt này?')) {
            let bookings = JSON.parse(localStorage.getItem(`tourBookings_${siteId}`) || '[]');
            bookings.splice(index, 1);
            localStorage.setItem(`tourBookings_${siteId}`, JSON.stringify(bookings));
            this.displayBookings(siteId);
        }
    }
}