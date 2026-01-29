import { Post, TopicCategory, PostComment } from '@/types/post';

const commentPool: PostComment[] = [
  { id: 'c1', user: 'Minh An', content: 'Bài tổng hợp rõ ràng, cảm ơn bạn!', avatar: 'https://i.pravatar.cc/80?img=32', createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString() },
  { id: 'c2', user: 'Lan Chi', content: 'Thông tin hữu ích, chờ cập nhật tiếp.', avatar: 'https://i.pravatar.cc/80?img=12', createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
  { id: 'c3', user: 'Quang Huy', content: 'Hay quá bác ơi', avatar: 'https://i.pravatar.cc/80?img=45', createdAt: new Date(Date.now() - 80 * 60 * 1000).toISOString() },
  { id: 'c4', user: 'Tuấn Kiệt', content: 'Đọc xong nắm được ý chính liền.', avatar: 'https://i.pravatar.cc/80?img=24', createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString() },
  { id: 'c5', user: 'Bảo Ngọc', content: 'Ủng hộ góc nhìn này.', avatar: 'https://i.pravatar.cc/80?img=51', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: 'c6', user: 'Hồng Nhung', content: 'Very good', avatar: 'https://i.pravatar.cc/80?img=68', createdAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString() },
  { id: 'c7', user: 'Anh Thư', content: 'Theo mình còn thiếu ý về tác động kinh tế.', avatar: 'https://i.pravatar.cc/80?img=19', createdAt: new Date(Date.now() - 50 * 60 * 1000).toISOString() },
  { id: 'c8', user: 'Quốc Việt', content: 'Tóm tắt gọn, dễ đọc.', avatar: 'https://i.pravatar.cc/80?img=4', createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
];

function pickComments(count = 3): PostComment[] {
  const shuffled = [...commentPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export const mockPosts: Post[] = [
  {
    id: '6',
    title: 'Đội tuyển Việt Nam thắng 3-2, fans vỡ òa trong niềm vui',
    summary: 'Đội tuyển bóng đá Việt Nam có chiến thắng ấn tượng 3-0 trước đối thủ mạnh, củng cố vị trí dẫn đầu bảng trong vòng loại giải đấu châu lục.',
    content: 'Trận đấu tối qua đã chứng kiến màn trình diễn xuất sắc của đội tuyển Việt Nam với chiến thắng đậm 3-0. Các cầu thủ đã thể hiện lối chơi pressing hiệu quả và khả năng dứt điểm sắc bén.\n\nHàng nghìn người hâm mộ đã đổ ra đường ăn mừng chiến thắng lịch sử này. Huấn luyện viên trưởng cho biết đội bóng sẽ tiếp tục duy trì phong độ tốt trong các trận đấu sắp tới.',
    originalUrl: 'https://facebook.com/vietnamfootball/posts/example',
    platform: 'facebook',
    author: {
      name: 'Bóng Đá Việt Nam',
      handle: '@bongdavietnam',
      avatar: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=100&h=100&fit=crop',
    },
    engagement: { likes: 456000, shares: 89000, comments: 45600 },
    comments: pickComments(4),
    topics: ['entertainment'],
    tags: ['Bóng đá', 'Đội tuyển', 'Chiến thắng', 'V-League'],
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 7.5 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://vff.org.vn/wp-content/uploads/2025/12/IMG_9310.jpg',
    sentiment: 'positive',
  },
  {
    id: '1',
    title: 'VinFast chính thức ra mắt mẫu xe điện mới với công nghệ tự lái cấp độ 3',
    summary: 'VinFast vừa công bố mẫu xe điện thế hệ mới với nhiều tính năng công nghệ tiên tiến, bao gồm khả năng tự lái cấp độ 3 và pin thế hệ mới cho quãng đường di chuyển lên đến 600km.',
    content: 'Trong sự kiện ra mắt sáng nay tại TP.HCM, VinFast đã chính thức giới thiệu mẫu xe điện thế hệ mới nhất với nhiều tính năng công nghệ đột phá. Xe được trang bị hệ thống pin thế hệ mới cho phép di chuyển 600km sau một lần sạc đầy, cùng với công nghệ tự lái cấp độ 3 - cho phép xe tự động điều khiển trong nhiều tình huống giao thông phức tạp.\n\nĐại diện VinFast cho biết đây là bước tiến quan trọng trong chiến lược phát triển xe điện của công ty, khẳng định vị thế của Việt Nam trên bản đồ công nghệ ô tô thế giới.',
    originalUrl: 'https://facebook.com/vinfast/posts/example',
    platform: 'facebook',
    author: {
      name: 'VinFast Vietnam',
      handle: '@VinFastVietnam',
      avatar: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    },
    engagement: { likes: 125000, shares: 34500, comments: 8900 },
    comments: pickComments(3),
    topics: ['tech'],
    tags: ['VinFast', 'Xe điện', 'Công nghệ', 'Tự lái'],
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://vinfastotohaiphong.com.vn/images/attachment/2481vinfast-vf3.jpg',
    sentiment: 'positive',
  },
  {
    id: '2',
    title: 'Giá vàng lập đỉnh mới, chuyên gia dự báo xu hướng tăng tiếp tục',
    summary: 'Giá vàng trong nước tiếp tục tăng mạnh, vượt ngưỡng 85 triệu đồng/lượng. Các chuyên gia nhận định xu hướng tăng sẽ còn kéo dài trong những tháng tới.',
    content: 'Thị trường vàng trong nước tiếp tục sôi động khi giá vàng SJC chính thức vượt ngưỡng 85 triệu đồng/lượng, lập kỷ lục mới trong lịch sử. Theo các chuyên gia, xu hướng này được hỗ trợ bởi nhiều yếu tố bao gồm tình hình địa chính trị thế giới và nhu cầu tích trữ vàng tăng cao.\n\nNhiều ngân hàng và tổ chức tài chính dự báo giá vàng có thể tiếp tục tăng trong thời gian tới, khuyến cáo nhà đầu tư cân nhắc kỹ trước khi quyết định mua vào.',
    originalUrl: 'https://x.com/taichinh24h/status/example',
    platform: 'twitter',
    author: {
      name: 'Tài Chính 24h',
      handle: '@taichinh24h',
      avatar: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&h=100&fit=crop',
    },
    engagement: { likes: 45600, shares: 12800, comments: 3400 },
    comments: pickComments(3),
    topics: ['finance'],
    tags: ['Vàng', 'Đầu tư', 'Thị trường', 'SJC'],
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=400&fit=crop',
    sentiment: 'neutral',
  },
  {
    id: '9',
    title: 'Tổng Bí thư: Khát vọng lớn, bước đi chắc',
    summary:
      'Khai mạc Đại hội Đảng XIV, Tổng Bí thư nhấn mạnh khát vọng phát triển bứt phá trước mốc 2030, cùng sự ủng hộ mạnh mẽ từ bạn bè quốc tế.',
    content:
      'Phát biểu khai mạc Đại hội XIV, Tổng Bí thư nhấn mạnh đây là Đại hội của niềm tin và khát vọng, đặt mục tiêu tạo bước chuyển bứt phá trước mốc 2030. Ông khẳng định khát vọng về một Việt Nam phồn vinh, hạnh phúc chưa bao giờ gần như hiện nay, nhưng cũng đi kèm nhiều thách thức. Đại hội nhận 559 thư, điện mừng từ 109 chính đảng, 6 tổ chức quốc tế và hơn 120 tổ chức nhân dân, thể hiện sự ủng hộ của bạn bè quốc tế. Với ý chí tự lực, tự cường và các quyết sách đột phá, Tổng Bí thư tin tưởng đất nước sẽ tiến vững chắc.',
    originalUrl: 'https://vnexpress.net/khai-mac-dai-hoi-dang-xiv-5007548.html',
    platform: 'facebook',
    author: {
      name: 'VnExpress',
      handle: '@vnexpress',
      avatar: 'https://i1-vnexpress.vnecdn.net/vnexpress/icons/vne_logo_r.png',
    },
    engagement: { likes: 12500, shares: 5300, comments: 4100 },
    comments: pickComments(3),
    topics: ['society'],
    tags: ['Đại hội Đảng XIV', 'Chính trị', 'Khai mạc', 'Khát vọng phát triển'],
    publishedAt: new Date('2026-01-20T08:00:00+07:00').toISOString(),
    processedAt: new Date().toISOString(),
    imageUrl:
      'https://i1-vnexpress.vnecdn.net/2026/01/20/cafe6c7c79c4f69aafd5-176887613-7296-2413-1768876166.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=OHIgKRIpDi9mn6HFsS5G9A',
    sentiment: 'positive',
  },
  {
    id: '3',
    title: 'Hot TikToker bất ngờ công bố kết hôn, fan "đổ gục" vì quá bất ngờ',
    summary: 'TikToker nổi tiếng với hơn 10 triệu followers vừa bất ngờ thông báo kết hôn với người yêu sau 2 năm hẹn hò bí mật, khiến cộng đồng mạng "dậy sóng".',
    content: 'Cộng đồng mạng Việt Nam vừa có một "cú sốc" lớn khi TikToker nổi tiếng bất ngờ đăng tải hình ảnh đám cưới trên trang cá nhân. Cặp đôi đã bí mật hẹn hò suốt 2 năm qua mà không ai hay biết.\n\nNgay sau khi thông tin được công bố, hàng triệu lời chúc phúc đã được gửi đến từ người hâm mộ. Đây được xem là một trong những tin vui lớn nhất của làng giải trí Việt trong năm.',
    originalUrl: 'https://tiktok.com/@hottiktoker/video/example',
    platform: 'tiktok',
    author: {
      name: 'Hot TikToker VN',
      handle: '@hottiktokervn',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
    engagement: { likes: 890000, shares: 234000, comments: 78900 },
    comments: pickComments(4),
    topics: ['entertainment', 'drama'],
    tags: ['TikToker', 'Đám cưới', 'Hot', 'Showbiz'],
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=400&fit=crop',
    sentiment: 'positive',
  },
  {
    id: '4',
    title: 'Tranh cãi nảy lửa về quy định mới cho xe máy điện: Dân mạng chia làm 2 phe',
    summary: 'Quy định mới về đăng ký và sử dụng xe máy điện gây tranh cãi lớn trên mạng xã hội. Người ủng hộ cho rằng cần thiết, người phản đối thấy quá phức tạp.',
    content: 'Quy định mới về quản lý xe máy điện vừa được công bố đã ngay lập tức gây ra làn sóng tranh cãi lớn trên các diễn đàn và mạng xã hội. Một bên cho rằng quy định này là cần thiết để đảm bảo an toàn giao thông, trong khi phe phản đối cho rằng thủ tục quá phức tạp và gây khó khăn cho người dân.\n\nNhiều ý kiến đề xuất cần có lộ trình thực hiện hợp lý hơn để người dân có thời gian thích nghi.',
    originalUrl: 'https://forum.vn/topic/xe-may-dien',
    platform: 'forum',
    author: {
      name: 'Diễn đàn Giao thông',
      handle: '@forumgiaothong',
      avatar: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    },
    engagement: { likes: 23400, shares: 5600, comments: 12300 },
    comments: pickComments(3),
    topics: ['society', 'drama'],
    tags: ['Xe máy điện', 'Quy định', 'Giao thông', 'Tranh cãi'],
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://quangphuong.vn/wp-content/uploads/2025/04/xe-may-dien-va-xe-xang-dau-la-lua-chon-thong-minh-cho-tuong-lai.jpg',
    sentiment: 'negative',
  },
  {
    id: '5',
    title: 'Startup Việt gọi vốn thành công 50 triệu USD từ quỹ đầu tư Mỹ',
    summary: 'Một startup công nghệ Việt Nam vừa hoàn thành vòng gọi vốn Series B trị giá 50 triệu USD, đánh dấu một trong những thương vụ lớn nhất năm trong lĩnh vực Fintech.',
    content: 'Startup fintech Việt Nam vừa công bố hoàn thành vòng gọi vốn Series B với tổng giá trị 50 triệu USD từ các nhà đầu tư hàng đầu thế giới. Đây là một trong những thương vụ gọi vốn lớn nhất trong lịch sử startup Việt Nam.\n\nCông ty dự kiến sử dụng nguồn vốn này để mở rộng hoạt động sang các thị trường Đông Nam Á khác và phát triển thêm các sản phẩm tài chính số mới.',
    originalUrl: 'https://x.com/startupvietnam/status/example',
    platform: 'twitter',
    author: {
      name: 'Startup Vietnam',
      handle: '@startupvietnam',
      avatar: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=100&h=100&fit=crop',
    },
    engagement: { likes: 34500, shares: 8900, comments: 2100 },
    comments: pickComments(3),
    topics: ['tech', 'finance'],
    tags: ['Startup', 'Gọi vốn', 'Fintech', 'Đầu tư'],
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://cafebiz.cafebizcdn.vn/162123310254002176/2025/10/1/startup-12-2202-17593114160671129210201-1759314311631-175931431225079952902.jpg',
    sentiment: 'positive',
  },
  
  {
    id: '7',
    title: 'AI Việt Nam đạt giải cao tại cuộc thi quốc tế, gây tiếng vang lớn',
    summary: 'Nhóm nghiên cứu AI từ Việt Nam vừa xuất sắc giành giải nhất tại cuộc thi trí tuệ nhân tạo quốc tế với sản phẩm nhận diện hình ảnh độ chính xác cao.',
    content: 'Nhóm các nhà nghiên cứu trẻ Việt Nam đã mang về niềm tự hào lớn khi giành giải nhất tại cuộc thi AI quốc tế diễn ra tại Singapore. Sản phẩm của họ - một hệ thống nhận diện hình ảnh y tế - đã vượt qua hàng trăm đội thi từ khắp nơi trên thế giới.\n\nĐây là minh chứng cho tiềm năng phát triển công nghệ AI của Việt Nam và mở ra nhiều cơ hội hợp tác quốc tế trong lĩnh vực này.',
    originalUrl: 'https://facebook.com/aivietnam/posts/example',
    platform: 'facebook',
    author: {
      name: 'AI Vietnam Community',
      handle: '@aivietnam',
      avatar: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
    },
    engagement: { likes: 67800, shares: 15600, comments: 3400 },
    comments: pickComments(3),
    topics: ['tech'],
    tags: ['AI', 'Công nghệ', 'Quốc tế', 'Nghiên cứu'],
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 9.5 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://asiasociety.org/sites/default/files/styles/1200w/public/2022-07/vietnam_imgA_sub2.png',
    sentiment: 'positive',
  },
  {
    id: '8',
    title: 'Drama showbiz: Hai ngôi sao nổi tiếng bất ngờ "unfriend" nhau sau scandal',
    summary: 'Cộng đồng mạng xôn xao khi phát hiện hai ngôi sao hàng đầu showbiz Việt đã hủy theo dõi nhau trên mạng xã hội sau những tin đồn mâu thuẫn.',
    content: 'Làn sóng bàn tán về drama showbiz không có dấu hiệu hạ nhiệt khi các fan sắc sảo phát hiện hai ngôi sao nổi tiếng đã bất ngờ hủy theo dõi nhau trên tất cả các nền tảng mạng xã hội.\n\nMặc dù cả hai chưa đưa ra bình luận chính thức, nhưng các nguồn tin thân cận cho biết mâu thuẫn bắt nguồn từ một dự án hợp tác bị đổ bể gần đây.',
    originalUrl: 'https://tiktok.com/@dramashowbiz/video/example',
    platform: 'tiktok',
    author: {
      name: 'Drama Showbiz VN',
      handle: '@dramashowbizvn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    engagement: { likes: 234000, shares: 56700, comments: 89000 },
    comments: pickComments(4),
    topics: ['entertainment', 'drama'],
    tags: ['Drama', 'Showbiz', 'Scandal', 'Ngôi sao'],
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 11.5 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
    sentiment: 'negative',
  }
 
];

export const topicLabels: Record<TopicCategory, string> = {
  tech: 'Công nghệ',
  finance: 'Tài chính',
  entertainment: 'Giải trí',
  society: 'Đời sống',
  drama: 'Drama MXH',
};

export const topicDescriptions: Record<TopicCategory, string> = {
  tech: 'Tin tức công nghệ mới nhất, AI, startup, điện thoại và các thiết bị số.',
  finance: 'Thị trường tài chính, chứng khoán, vàng, bất động sản và đầu tư.',
  entertainment: 'Showbiz, âm nhạc, phim ảnh, thể thao và các sự kiện giải trí.',
  society: 'Tin tức đời sống, xã hội, giáo dục và các vấn đề cộng đồng.',
  drama: 'Các drama hot trên mạng xã hội, tranh cãi và tin đồn nổi bật.',
};

export const topicIcons: Record<TopicCategory, string> = {
  tech: '💻',
  finance: '📈',
  entertainment: '🎬',
  society: '🏠',
  drama: '🔥',
};

export const popularKeywords = [
  'VinFast',
  'Vàng SJC',
  'Bóng đá',
  'TikTok',
  'Drama',
  'AI',
  'Startup',
  'Showbiz',
  'Công nghệ',
  'Đầu tư',
];

export function getRandomizedPosts(limit?: number) {
  const shuffled = [...mockPosts].sort(() => Math.random() - 0.5);
  return typeof limit === 'number' ? shuffled.slice(0, limit) : shuffled;
}
