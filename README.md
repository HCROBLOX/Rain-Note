diff --git a/README.md b/README.md
index a42497239e1e069520fa24c3d1bbd720dbf10b39..85c78f0abab3e68d8220911f6b7589cbbc1638ee 100644
--- a/README.md
+++ b/README.md
@@ -1,2 +1,137 @@
-# Rain-Note
-Lưu lại những văn bản của bạn và chia sẻ nó
+<div align="center">
+
+# 🌧️ Rain Note
+
+### Trình ghi chú online hiện đại, nhẹ, đẹp và dễ chia sẻ
+
+Rain Note là một ứng dụng ghi chú trên trình duyệt lấy cảm hứng từ trải nghiệm viết nhanh của các online notepad, nhưng được thiết kế lại theo phong cách chuyên nghiệp hơn: giao diện sạch, thao tác mượt, hỗ trợ Font Awesome icon và lưu nội dung ngay trên thiết bị của bạn.
+
+[![Status](https://img.shields.io/badge/status-active-22c55e?style=for-the-badge)](#)
+[![Made with](https://img.shields.io/badge/made%20with-HTML%20%7C%20CSS%20%7C%20JavaScript-2563eb?style=for-the-badge)](#)
+[![Icons](https://img.shields.io/badge/icons-Font%20Awesome-06b6d4?style=for-the-badge)](#)
+
+</div>
+
+---
+
+## ✨ Tổng quan
+
+**Rain Note** giúp bạn ghi lại ý tưởng, nội dung nháp, checklist, đường link hoặc ghi chú cá nhân chỉ trong vài giây. Dự án tập trung vào trải nghiệm **nhanh - rõ ràng - đẹp - dễ mở rộng**, phù hợp để phát triển tiếp thành một nền tảng ghi chú online hoàn chỉnh.
+
+> Mục tiêu: tạo một không gian viết tối giản như notepad online, nhưng có cảm giác cao cấp hơn, thân thiện hơn và chuyên nghiệp hơn.
+
+---
+
+## 🚀 Tính năng nổi bật
+
+| Tính năng | Mô tả |
+| --- | --- |
+| 📝 **Editor trực quan** | Khu vực nhập tiêu đề và nội dung rõ ràng, dễ sử dụng. |
+| 💾 **Autosave cục bộ** | Tự động lưu ghi chú vào `localStorage` trên trình duyệt. |
+| 📋 **Copy nhanh** | Sao chép toàn bộ ghi chú chỉ bằng một nút bấm. |
+| 🧹 **Xóa nhanh** | Làm sạch nội dung và trạng thái lưu khi cần bắt đầu lại. |
+| 🔐 **Privacy UI** | Có giao diện lựa chọn Public, Private hoặc Password Protected. |
+| 🎨 **Giao diện responsive** | Hiển thị tốt trên desktop, tablet và mobile. |
+| ⭐ **Font Awesome icons** | Sử dụng hệ icon chuyên nghiệp để tăng tính nhận diện và độ hoàn thiện. |
+
+---
+
+## 🖼️ Giao diện
+
+Rain Note được thiết kế với các thành phần chính:
+
+- **Header sticky** với logo Rain Note và điều hướng nhanh.
+- **Hero section** giới thiệu sản phẩm cùng CTA nổi bật.
+- **Workspace editor** gồm tiêu đề, nội dung, loại ghi chú và nút thao tác.
+- **Side panel** cho quyền riêng tư và danh sách ghi chú đã lưu.
+- **Feature cards** trình bày các điểm mạnh của ứng dụng.
+- **FAQ section** giúp người dùng hiểu nhanh cách sử dụng.
+
+---
+
+## 🧱 Công nghệ sử dụng
+
+```text
+HTML5        Semantic structure
+CSS3         Responsive UI, gradients, cards, transitions
+JavaScript   Autosave, copy, clear, localStorage
+Font Awesome Professional icon system via CDN
+```
+
+---
+
+## 📂 Cấu trúc dự án
+
+```text
+Rain-Note/
+├── index.html    # Markup chính của ứng dụng
+├── styles.css    # Toàn bộ giao diện và responsive layout
+├── script.js     # Logic lưu, copy, xóa và render ghi chú
+└── README.md     # Tài liệu dự án
+```
+
+---
+
+## ⚡ Chạy dự án trên máy local
+
+Bạn không cần cài framework hoặc build tool. Chỉ cần clone repo và mở file HTML.
+
+```bash
+git clone https://github.com/HCROBLOX/Rain-Note.git
+cd Rain-Note
+```
+
+### Cách 1: Mở trực tiếp
+
+Mở file `index.html` bằng trình duyệt bất kỳ.
+
+### Cách 2: Chạy bằng local server
+
+```bash
+python3 -m http.server 4173
+```
+
+Sau đó truy cập:
+
+```text
+http://localhost:4173
+```
+
+---
+
+## 🧭 Hướng phát triển tiếp theo
+
+- [ ] Thêm hệ thống tài khoản người dùng.
+- [ ] Đồng bộ ghi chú lên cloud/database.
+- [ ] Tạo link chia sẻ public cho từng ghi chú.
+- [ ] Hỗ trợ Markdown preview.
+- [ ] Thêm chế độ Dark Mode.
+- [ ] Cho phép xuất ghi chú sang `.txt`, `.md` hoặc PDF.
+- [ ] Thêm tìm kiếm và phân loại ghi chú theo tag.
+
+---
+
+## 🤝 Đóng góp
+
+Mọi ý tưởng cải tiến đều được chào đón. Bạn có thể:
+
+1. Fork repository.
+2. Tạo branch mới cho tính năng hoặc sửa lỗi.
+3. Commit thay đổi với mô tả rõ ràng.
+4. Mở Pull Request để thảo luận và review.
+
+---
+
+## 📄 License
+
+Dự án hiện chưa khai báo license cụ thể. Nếu bạn muốn sử dụng lại mã nguồn cho sản phẩm riêng, hãy kiểm tra hoặc bổ sung license phù hợp trước khi phát hành.
+
+---
+
+<div align="center">
+
+**Rain Note — Write faster. Save smarter. Share easier.**
+
+Made with 💙 for creators, students and builders.
+
+</div>
