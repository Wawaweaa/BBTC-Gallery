import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  Heart,
  Bookmark,
  Smile,
  HelpCircle,
  MessageCircle,
  User,
  ArrowLeft,
  Search,
  Upload,
  LogOut,
  Menu,
  X,
  Camera,
  Tag,
  Clock,
  TrendingUp,
  Grid,
  List,
  Filter,
  Star,
  Eye,
} from 'lucide-react';

// 创建用户上下文
const UserContext = createContext();

// 模拟数据生成
const generateMockImages = () => {
  const titles = [
    '梦幻森林',
    '赛博朋克城市',
    '抽象艺术',
    '未来机甲',
    '水彩风景',
    '魔法少女',
    '星空奇境',
    '古典建筑',
    '科幻战舰',
    '童话世界',
  ];
  const authors = [
    '艺术家小明',
    '创作者小红',
    '设计师小李',
    '概念艺术家',
    '画家小王',
    '插画师小张',
  ];
  const aiTools = [
    'Midjourney V6',
    'DALL-E 3',
    'Stable Diffusion XL',
    'NovelAI',
    'Bing Image Creator',
  ];
  const tags = [
    '奇幻',
    '科幻',
    '抽象',
    '写实',
    '动漫',
    '风景',
    '人物',
    '建筑',
    '概念艺术',
    '插画',
  ];

  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/400/${
      400 + Math.floor(Math.random() * 200)
    }?random=${i}`,
    thumbnail: `https://picsum.photos/400/${
      400 + Math.floor(Math.random() * 200)
    }?random=${i}`,
    title: titles[i % titles.length],
    author: authors[Math.floor(Math.random() * authors.length)],
    authorId: Math.floor(Math.random() * 6) + 1,
    prompt: `A detailed prompt for ${
      titles[i % titles.length]
    } with various artistic parameters and style descriptions`,
    aiTool: aiTools[Math.floor(Math.random() * aiTools.length)],
    tags: Array.from(
      { length: Math.floor(Math.random() * 3) + 2 },
      () => tags[Math.floor(Math.random() * tags.length)]
    ),
    likes: Math.floor(Math.random() * 1000),
    favorites: Math.floor(Math.random() * 500),
    views: Math.floor(Math.random() * 5000) + 100,
    reactions: {
      happy: Math.floor(Math.random() * 200),
      confused: Math.floor(Math.random() * 50),
    },
    comments: [],
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ).toISOString(),
    featured: Math.random() > 0.8,
  }));
};

// 初始数据
const initialData = {
  users: [
    {
      id: 1,
      username: 'demo',
      password: 'demo123',
      email: 'demo@example.com',
      avatar: '👤',
      bio: '热爱AI艺术创作',
      createdImages: [],
      following: [],
      followers: [],
    },
  ],
  images: generateMockImages(),
  currentUser: null,
};

const initialInteractions = {
  likes: [],
  favorites: [],
  reactions: {},
  following: [],
};

function App() {
  const [data, setData] = useState(initialData);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('gallery');
  const [selectedImage, setSelectedImage] = useState(null);
  const [userInteractions, setUserInteractions] = useState(initialInteractions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // 获取所有标签
  const allTags = [...new Set(data.images.flatMap((img) => img.tags))];

  // 登录组件
  const LoginView = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      email: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');

      if (isLogin) {
        const user = data.users.find(
          (u) =>
            u.username === formData.username && u.password === formData.password
        );
        if (user) {
          setCurrentUser(user);
          setCurrentView('gallery');
        } else {
          setError('用户名或密码错误');
        }
      } else {
        if (data.users.some((u) => u.username === formData.username)) {
          setError('用户名已存在');
          return;
        }

        const newUser = {
          id: Date.now(),
          username: formData.username,
          password: formData.password,
          email: formData.email,
          avatar: '👤',
          bio: '',
          createdImages: [],
          following: [],
          followers: [],
        };

        setData((prev) => ({
          ...prev,
          users: [...prev.users, newUser],
        }));
        setCurrentUser(newUser);
        setCurrentView('gallery');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? '登录' : '注册'} AI图片社区
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">用户名</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">密码</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1">邮箱</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isLogin ? '登录' : '注册'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            {isLogin ? '还没有账号？' : '已有账号？'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:underline ml-1"
            >
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </div>

          {isLogin && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-600">
              演示账号：demo / demo123
            </div>
          )}
        </div>
      </div>
    );
  };

  // 图片详情组件
  const ImageDetailView = () => {
    const [comment, setComment] = useState('');
    const [imageComments, setImageComments] = useState(
      selectedImage?.comments || []
    );

    const handleLike = () => {
      if (!currentUser) return;

      setUserInteractions((prev) => {
        const isLiked = prev.likes.includes(selectedImage.id);
        return {
          ...prev,
          likes: isLiked
            ? prev.likes.filter((id) => id !== selectedImage.id)
            : [...prev.likes, selectedImage.id],
        };
      });

      setData((prev) => ({
        ...prev,
        images: prev.images.map((img) =>
          img.id === selectedImage.id
            ? {
                ...img,
                likes: userInteractions.likes.includes(selectedImage.id)
                  ? img.likes - 1
                  : img.likes + 1,
              }
            : img
        ),
      }));
    };

    const handleFavorite = () => {
      if (!currentUser) return;

      setUserInteractions((prev) => {
        const isFavorited = prev.favorites.includes(selectedImage.id);
        return {
          ...prev,
          favorites: isFavorited
            ? prev.favorites.filter((id) => id !== selectedImage.id)
            : [...prev.favorites, selectedImage.id],
        };
      });
    };

    const handleReaction = (type) => {
      if (!currentUser) return;

      setUserInteractions((prev) => {
        const imageReactions = prev.reactions[selectedImage.id] || {};
        const hasReacted = imageReactions[type];

        return {
          ...prev,
          reactions: {
            ...prev.reactions,
            [selectedImage.id]: {
              ...imageReactions,
              [type]: !hasReacted,
            },
          },
        };
      });
    };

    const handleComment = (e) => {
      e.preventDefault();
      if (!comment.trim() || !currentUser) return;

      const newComment = {
        id: Date.now(),
        userId: currentUser.id,
        username: currentUser.username,
        text: comment,
        createdAt: new Date().toISOString(),
      };

      setImageComments([...imageComments, newComment]);
      setComment('');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex flex-col lg:flex-row h-full">
              <div className="lg:w-2/3 bg-black flex items-center justify-center p-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full max-h-full object-contain"
                />
              </div>

              <div className="lg:w-1/3 bg-white p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedImage.author}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(selectedImage.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-1 ${
                      userInteractions.likes.includes(selectedImage.id)
                        ? 'text-red-500'
                        : 'text-gray-600'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        userInteractions.likes.includes(selectedImage.id)
                          ? 'fill-current'
                          : ''
                      }`}
                    />
                    <span>{selectedImage.likes}</span>
                  </button>

                  <button
                    onClick={handleFavorite}
                    className={`flex items-center gap-1 ${
                      userInteractions.favorites.includes(selectedImage.id)
                        ? 'text-yellow-500'
                        : 'text-gray-600'
                    }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        userInteractions.favorites.includes(selectedImage.id)
                          ? 'fill-current'
                          : ''
                      }`}
                    />
                    <span>{selectedImage.favorites}</span>
                  </button>

                  <div className="flex items-center gap-1 text-gray-600">
                    <Eye className="w-5 h-5" />
                    <span>{selectedImage.views}</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h3 className="font-medium mb-2">AI工具</h3>
                  <p className="text-sm bg-blue-100 text-blue-700 inline-block px-2 py-1 rounded">
                    {selectedImage.aiTool}
                  </p>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h3 className="font-medium mb-2">提示词</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {selectedImage.prompt}
                  </p>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h3 className="font-medium mb-2">标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-sm bg-gray-200 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h3 className="font-medium mb-2">反应</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleReaction('happy')}
                      className={`flex items-center gap-1 ${
                        userInteractions.reactions[selectedImage.id]?.happy
                          ? 'text-yellow-500'
                          : 'text-gray-600'
                      }`}
                    >
                      <Smile className="w-5 h-5" />
                      <span>{selectedImage.reactions.happy}</span>
                    </button>
                    <button
                      onClick={() => handleReaction('confused')}
                      className={`flex items-center gap-1 ${
                        userInteractions.reactions[selectedImage.id]?.confused
                          ? 'text-purple-500'
                          : 'text-gray-600'
                      }`}
                    >
                      <HelpCircle className="w-5 h-5" />
                      <span>{selectedImage.reactions.confused}</span>
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">评论</h3>
                  <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                    {imageComments.map((c) => (
                      <div key={c.id} className="text-sm">
                        <span className="font-medium">{c.username}: </span>
                        <span className="text-gray-600">{c.text}</span>
                      </div>
                    ))}
                  </div>

                  {currentUser && (
                    <form onSubmit={handleComment} className="flex gap-2">
                      <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="添加评论..."
                        className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        发送
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 图片画廊组件
  const GalleryView = () => {
    // 过滤和排序图片
    let filteredImages = data.images;

    if (searchTerm) {
      filteredImages = filteredImages.filter(
        (img) =>
          img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          img.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          img.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (filterTag !== 'all') {
      filteredImages = filteredImages.filter((img) =>
        img.tags.includes(filterTag)
      );
    }

    // 排序
    switch (sortBy) {
      case 'popular':
        filteredImages.sort((a, b) => b.likes - a.likes);
        break;
      case 'views':
        filteredImages.sort((a, b) => b.views - a.views);
        break;
      case 'latest':
      default:
        filteredImages.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* 导航栏 */}
        <nav className="bg-white shadow-sm sticky top-0 z-40">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-8">
                <h1 className="text-xl font-bold text-gray-900">AI图片社区</h1>

                <div className="hidden md:flex items-center gap-6">
                  <button className="text-gray-700 hover:text-gray-900 font-medium">
                    发现
                  </button>
                  <button className="text-gray-700 hover:text-gray-900">
                    热门
                  </button>
                  <button className="text-gray-700 hover:text-gray-900">
                    最新
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:block relative">
                  <input
                    type="text"
                    placeholder="搜索图片..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>

                {currentUser ? (
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <Upload className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="hidden md:block text-sm font-medium">
                        {currentUser.username}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentUser(null);
                        setCurrentView('login');
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setCurrentView('login')}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    登录
                  </button>
                )}

                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* 筛选栏 */}
        <div className="bg-white border-b">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4 overflow-x-auto">
                <button
                  onClick={() => setFilterTag('all')}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    filterTag === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  全部
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFilterTag(tag)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                      filterTag === tag
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="latest">最新</option>
                  <option value="popular">最热门</option>
                  <option value="views">最多浏览</option>
                </select>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 图片网格 */}
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.thumbnail}
                      alt={image.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      by {image.author}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {image.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {image.views}
                        </span>
                      </div>
                      {image.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow cursor-pointer flex gap-4"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.thumbnail}
                    alt={image.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-1">{image.title}</h3>
                    <p className="text-gray-600 mb-2">
                      by {image.author} • {image.aiTool}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {image.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-sm bg-gray-100 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {image.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {image.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {image.comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">没有找到匹配的图片</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // 主渲染逻辑
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {currentView === 'login' && <LoginView />}
      {currentView === 'gallery' && <GalleryView />}
      {selectedImage && <ImageDetailView />}
    </UserContext.Provider>
  );
}

export default App;
