class SiteRenderer {
    constructor(data) {
        this.data = data;
    }

    renderSiteCard(site) {
        return `
        <div class="site-item w-1/2 px-4 mb-8" style="transition: all 0.3s ease">
          <div class="bg-white rounded-lg shadow-md p-6">
            <a href="${site.link || '#'}">
              <img src="${site.image}" alt="${site.name}" 
                   class="w-full h-80 object-cover mb-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
            </a>
            <h3 class="text-2xl font-semibold text-red-700 mb-3">
              <a href="${site.link || '#'}" class="hover:text-blue-600 transition-colors">${site.name}</a>
            </h3>
            <p class="description text-gray-700 mb-4" style="font-size: 1.2rem;">${site.description}</p>
  
            <div class="text-sm text-gray-600">
              <p class="location" style="font-size: 1.2rem;"><i class="fas fa-map-marker-alt mr-2"></i>${site.location}</p>
              <p style="font-size: 1.2rem;"><i class="far fa-calendar-alt mr-2"></i>Thành lập: ${site.established}</p>
              <p style="font-size: 1.2rem;"><i class="fas fa-award mr-2"></i>Công nhận di tích: ${site.recognition}</p>
            </div>
  
            <button onclick="toggleDetails('${site.id}-details')"
                    class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center justify-center gap-2">
              <span>Xem chi tiết</span>
              <i class="fas fa-chevron-down transition-transform duration-300" id="${site.id}-icon"></i>
            </button>
  
            ${this.renderSiteDetails(site)}
          </div>
        </div>
      `;
    }

    renderSiteDetails(site) {
        return `
        <div id="${site.id}-details" class="hidden mt-4 bg-gray-50 p-4 rounded-lg transition-all duration-300">
          <h4 class="font-semibold text-lg mb-2">Lịch sử hình thành</h4>
          <p class="text-gray-700 mb-3">${site.details.history}</p>
  
          <h4 class="font-semibold text-lg mb-2">Giá trị văn hóa</h4>
          <ul class="list-disc ml-6 text-gray-700 mb-3">
            ${site.details.culturalValue.map(value => `<li>${value}</li>`).join('')}
          </ul>
  
          <h4 class="font-semibold text-lg mb-2">Giá trị lịch sử</h4>
          <ul class="list-disc ml-6 text-gray-700 mb-3">
            ${site.details.historicalValue.map(value => `<li>${value}</li>`).join('')}
          </ul>
  
          <h4 class="font-semibold text-lg mb-2">Tiện ích tham quan</h4>
          <div class="grid grid-cols-2 gap-4 text-gray-700">
            <div>
              <h5 class="font-medium mb-2">Dịch vụ</h5>
              <ul class="list-disc ml-6">
                ${site.details.services.map(service => `<li>${service}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h5 class="font-medium mb-2">Thông tin hữu ích</h5>
              <ul class="list-disc ml-6">
                ${site.details.info.map(info => `<li>${info}</li>`).join('')}
              </ul>
            </div>
          </div>
  
          ${this.renderBookingSection(site)}
        </div>
      `;
    }

    renderBookingSection(site) {
        return `
        <div class="mt-4">
          <div class="mb-4 h-64 rounded-lg overflow-hidden">
            <iframe src="${site.details.mapUrl}" 
                    class="w-full h-full border-0" 
                    allowfullscreen="" 
                    loading="lazy">
            </iframe>
          </div>
  
          <div class="flex gap-4">
            <button onclick="window.open('${site.details.directionsUrl}')"
                    class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
              <i class="fas fa-map-marked-alt"></i>
              Chỉ đường
            </button>
  
            <button onclick="bookingManager.showForm('${site.id}')"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
              <i class="fas fa-calendar-alt"></i>
              Đặt lịch tham quan
            </button>
          </div>
  
          ${this.renderBookingForm(site)}
        </div>
      `;
    }

    renderBookingForm(site) {
        return `
        <div id="bookingForm_${site.id}" class="hidden mt-4 p-4 bg-gray-100 rounded-lg">
          <h5 class="font-medium mb-3">Đặt lịch tham quan</h5>
          <form class="space-y-3" onsubmit="bookingManager.saveBooking(event, '${site.id}')">
            <div>
              <label class="block text-sm mb-1">Họ và tên</label>
              <input type="text" id="name_${site.id}" class="w-full px-3 py-2 border rounded"
                     placeholder="Nhập họ và tên của bạn" required>
            </div>
            <!-- Thêm các trường form khác tương tự -->
            <button type="submit"
                    class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
              Xác nhận đặt lịch
            </button>
          </form>
        </div>
      `;
    }

    renderHistoricalSite(site) {
        return `
        <div class="historical-site">
            <div class="site-header">
                <img src="${site.image}" alt="${site.name}" class="site-image">
                <h2 class="site-name">${site.name}</h2>
            </div>
            
            <div class="site-info">
                <p class="site-description">${site.description}</p>
                <div class="site-metadata">
                    <p><strong>Địa điểm:</strong> ${site.location}</p>
                    <p><strong>Thành lập:</strong> ${site.established}</p>
                    <p><strong>Công nhận:</strong> ${site.recognition}</p>
                </div>
            </div>

            <div class="site-details">
                <div class="history-section">
                    <h3>Lịch sử hình thành</h3>
                    <p>${site.details.history}</p>
                </div>

                <div class="values-section">
                    <div class="cultural-value">
                        <h3>Giá trị văn hóa</h3>
                        <ul>
                            ${site.details.culturalValue.map(value => `<li>${value}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="historical-value">
                        <h3>Giá trị lịch sử</h3>
                        <ul>
                            ${site.details.historicalValue.map(value => `<li>${value}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="visitor-section">
                    <div class="services">
                        <h3>Dịch vụ</h3>
                        <ul>
                            ${site.details.services.map(service => `<li>${service}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="visitor-info">
                        <h3>Thông tin hữu ích</h3>
                        <ul>
                            ${site.details.info.map(info => `<li>${info}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      `;
    }

    renderOverview() {
        const overview = this.data.overview;
        return `
            <div class="overview-section max-w-7xl mx-auto px-4 py-8">
                <!-- Introduction Section -->
                <div class="intro-section bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h1 class="text-3xl font-bold text-red-800 mb-4">${overview.introduction.title}</h1>
                    <p class="text-gray-700 text-lg mb-8">${overview.introduction.description}</p>
                    
                    <!-- Values Grid -->
                    <div class="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${overview.introduction.values.map(value => `
                            <div class="value-card bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-all">
                                <h3 class="text-xl font-semibold text-red-700 mb-3">${value.title}</h3>
                                <p class="text-gray-600">${value.description}</p>
                            </div>
                        `).join('')}
                    </div>
                    
                    <p class="text-gray-700 text-lg mt-8">${overview.introduction.conclusion}</p>
                </div>

                <!-- Statistics Section -->
                <div class="stats-section grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <!-- Categories Chart -->
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h2 class="text-2xl font-bold text-red-800 mb-4">Phân loại di tích</h2>
                        <div class="categories-chart">
                            ${overview.statistics.categories.map(category => `
                                <div class="category-bar mb-4">
                                    <div class="flex justify-between mb-2">
                                        <span class="text-gray-700">${category.name}</span>
                                        <span class="font-semibold">${category.count}</span>
                                    </div>
                                    <div class="bg-gray-200 rounded-full h-4">
                                        <div class="bg-red-600 rounded-full h-4" 
                                             style="width: ${(category.count / overview.statistics.total) * 100}%">
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Distribution Map -->
                    <div class="bg-white rounded-lg shadow-lg p-6">
                        <h2 class="text-2xl font-bold text-red-800 mb-4">Phân bố địa lý</h2>
                        <div class="distribution-list">
                            ${overview.distribution.map(item => `
                                <div class="distribution-item flex justify-between items-center mb-4">
                                    <span class="text-gray-700">${item.location}</span>
                                    <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full font-semibold">
                                        ${item.count} di tích
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- General Information -->
                <div class="general-info bg-white rounded-lg shadow-lg p-6">
                    <h2 class="text-2xl font-bold text-red-800 mb-4">Thông tin chung</h2>
                    <ul class="list-disc list-inside space-y-2">
                        ${overview.generalInfo.map(info => `
                            <li class="text-gray-700">${info}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    render() {
        const container = document.getElementById('di-tich-quoc-gia');
        container.innerHTML = `
        <div class="sites-section">
            <h1 class="main-title">Di Tích Cấp Quốc Gia - Trà Vinh</h1>
            <div class="flex flex-wrap -mx-4" id="sites-container">
                ${this.data.sites.map(site => this.renderSiteCard(site)).join('')}
            </div>
        </div>
        <div class="overview-section">
            ${this.renderOverview()}
        </div>
        `;
    }
}

// Export the renderer class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SiteRenderer };
}