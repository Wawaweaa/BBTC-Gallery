import React, { useState, useEffect, createContext, useContext } from 'react';

// 创建简单的图标组件来替代 lucide-react
const Icon = ({ name, size = 20, fill = 'none', style = {} }) => {
  const icons = {
    Heart: '♥',
    Bookmark: '⚑',
    User: '👤',
    ArrowLeft: '←',
    Search: '🔍',
    Upload: '↑',
    Logout: '⇦',
    Eye: '👁',
    Grid: '⊞',
    List: '☰',
    MessageCircle: '💬',
  };

  return (
    <span
      style={{
        fontSize: `${size}px`,
        display: 'inline-block',
        lineHeight: 1,
        ...style,
      }}
    >
      {icons[name] || '?'}
    </span>
  );
};

// 定义所有需要的图标组件
const Heart = (props) => <Icon name="Heart" {...props} />;
const Bookmark = (props) => <Icon name="Bookmark" {...props} />;
const User = (props) => <Icon name="User" {...props} />;
const ArrowLeft = (props) => <Icon name="ArrowLeft" {...props} />;
const Search = (props) => <Icon name="Search" {...props} />;
const Upload = (props) => <Icon name="Upload" {...props} />;
const Logout = (props) => <Icon name="Logout" {...props} />;
const Eye = (props) => <Icon name="Eye" {...props} />;
const Grid = (props) => <Icon name="Grid" {...props} />;
const List = (props) => <Icon name="List" {...props} />;
const MessageCircle = (props) => <Icon name="MessageCircle" {...props} />;

// 样式定义
const styles = {
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  nav: {
    backgroundColor: 'white',
    padding: '0 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 40,
  },
  navInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  buttonSecondary: {
    padding: '8px 16px',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    position: 'relative',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
};

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
    '星空漫游',
    '魔法少女',
    '废土世界',
    '古风仙侠',
    '蒸汽朋克',
    '极简主义',
    '超现实主义',
  ];

  const tags = ['科幻', '奇幻', '人物', '风景', '动漫', '建筑', '抽象', '写实'];
  const users = [
    '设计师小李',
    '插画师小王',
    '概念艺术家',
    '摄影师小张',
    'AI创作者',
  ];

  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: titles[i % titles.length],
    imageUrl: `https://picsum.photos/400/300?random=${i}`,
    author: users[i % users.length],
    likes: Math.floor(Math.random() * 5000),
    views: Math.floor(Math.random() * 10000),
    tags: [tags[i % tags.length], tags[(i + 1) % tags.length]],
    timestamp: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
    aiModel: ['Midjourney', 'DALL-E 3', 'Stable Diffusion'][i % 3],
    prompt: '详细的AI绘画提示词...',
    bookmarked: false,
    liked: false,
  }));
};

// 登录页面组件
const LoginView = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin({ username, id: Date.now() });
    }
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '8px',
            }}
          >
            AI图片社区
          </h1>
          <p
            style={{
              textAlign: 'center',
              color: '#6b7280',
              marginBottom: '32px',
            }}
          >
            {isLogin ? '登录你的账户' : '创建新账户'}
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                用户名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                placeholder="请输入用户名"
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="请输入密码"
                required
              />
            </div>

            <button
              type="submit"
              style={{
                ...styles.button,
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                fontSize: '16px',
              }}
            >
              {isLogin ? '登录' : '注册'}
            </button>
          </form>

          <p
            style={{
              textAlign: 'center',
              marginTop: '24px',
              color: '#6b7280',
              fontSize: '14px',
            }}
          >
            {isLogin ? '还没有账户？' : '已有账户？'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{
                color: '#3b82f6',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '4px',
              }}
            >
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// 图片展示页面组件
const GalleryView = ({ onImageClick, onLogout, currentUser }) => {
  const [images, setImages] = useState(generateMockImages());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');

  // 标签列表
  const tags = [
    '全部',
    '科幻',
    '奇幻',
    '人物',
    '风景',
    '动漫',
    '建筑',
    '抽象',
    '写实',
  ];

  // 过滤和排序图片
  const filteredImages = images
    .filter((image) => {
      const matchesSearch =
        image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = filterTag === 'all' || image.tags.includes(filterTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'views':
          return b.views - a.views;
        case 'latest':
        default:
          return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });

  const handleLike = (e, imageId) => {
    e.stopPropagation();
    setImages(
      images.map((img) =>
        img.id === imageId
          ? {
              ...img,
              liked: !img.liked,
              likes: img.liked ? img.likes - 1 : img.likes + 1,
            }
          : img
      )
    );
  };

  const handleBookmark = (e, imageId) => {
    e.stopPropagation();
    setImages(
      images.map((img) =>
        img.id === imageId ? { ...img, bookmarked: !img.bookmarked } : img
      )
    );
  };

  return (
    <div style={styles.container}>
      {/* 导航栏 */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>AI图片社区</h1>

            {/* 搜索框 */}
            <div
              style={{
                position: 'relative',
                width: '300px',
                display: window.innerWidth > 768 ? 'block' : 'none',
              }}
            >
              <Search
                size={20}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                }}
              />
              <input
                type="text"
                placeholder="搜索图片..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  ...styles.input,
                  paddingLeft: '36px',
                  width: '100%',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={styles.button}>
              <Upload size={16} />
              上传
            </button>
            <div style={{ position: 'relative' }}>
              <button style={styles.buttonSecondary}>
                <User size={16} />
                {currentUser.username}
              </button>
            </div>
            <button
              onClick={onLogout}
              style={{ ...styles.buttonSecondary, padding: '8px' }}
              title="退出登录"
            >
              <Logout size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* 筛选栏 */}
      <div
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 20px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: window.innerWidth > 768 ? 'row' : 'column',
            gap: '16px',
            alignItems: window.innerWidth > 768 ? 'center' : 'stretch',
            justifyContent: 'space-between',
          }}
        >
          {/* 标签筛选 */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
            }}
          >
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag === '全部' ? 'all' : tag)}
                style={{
                  ...styles.buttonSecondary,
                  backgroundColor: (
                    tag === '全部' ? filterTag === 'all' : filterTag === tag
                  )
                    ? '#3b82f6'
                    : '#f3f4f6',
                  color: (
                    tag === '全部' ? filterTag === 'all' : filterTag === tag
                  )
                    ? 'white'
                    : '#374151',
                  whiteSpace: 'nowrap',
                  padding: '6px 12px',
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 排序和视图切换 */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                ...styles.input,
                width: 'auto',
                padding: '6px 12px',
              }}
            >
              <option value="latest">最新</option>
              <option value="popular">最热门</option>
              <option value="views">最多浏览</option>
            </select>

            <button
              onClick={() => setViewMode('grid')}
              style={{
                ...styles.buttonSecondary,
                padding: '6px 10px',
                backgroundColor: viewMode === 'grid' ? '#3b82f6' : '#f3f4f6',
                color: viewMode === 'grid' ? 'white' : '#374151',
              }}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                ...styles.buttonSecondary,
                padding: '6px 10px',
                backgroundColor: viewMode === 'list' ? '#3b82f6' : '#f3f4f6',
                color: viewMode === 'list' ? 'white' : '#374151',
              }}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 图片网格 */}
      <div style={styles.content}>
        <div
          style={
            viewMode === 'grid'
              ? styles.grid
              : { display: 'flex', flexDirection: 'column', gap: '16px' }
          }
        >
          {filteredImages.map((image) => (
            <div
              key={image.id}
              style={{
                ...styles.card,
                cursor: 'pointer',
                display: viewMode === 'list' ? 'flex' : 'block',
                gap: viewMode === 'list' ? '16px' : '0',
              }}
              onClick={() => onImageClick(image)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'translateY(-4px)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'translateY(0)')
              }
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                style={{
                  width: viewMode === 'list' ? '200px' : '100%',
                  height: viewMode === 'list' ? '150px' : '200px',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  padding: '16px',
                  flex: viewMode === 'list' ? 1 : 'none',
                }}
              >
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}
                >
                  {image.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '12px',
                  }}
                >
                  by {image.author}
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  {image.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '2px 8px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#374151',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button
                      onClick={(e) => handleLike(e, image.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: image.liked ? '#ef4444' : '#6b7280',
                      }}
                    >
                      <Heart
                        size={16}
                        fill={image.liked ? '#ef4444' : 'none'}
                      />
                      <span style={{ fontSize: '14px' }}>{image.likes}</span>
                    </button>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#6b7280',
                      }}
                    >
                      <Eye size={16} />
                      <span style={{ fontSize: '14px' }}>{image.views}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleBookmark(e, image.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: image.bookmarked ? '#3b82f6' : '#6b7280',
                    }}
                  >
                    <Bookmark
                      size={16}
                      fill={image.bookmarked ? '#3b82f6' : 'none'}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 图片详情页组件
const ImageDetailView = ({ image, onBack, currentUser }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: '艺术爱好者', content: '这个作品太棒了！', time: '2小时前' },
    { id: 2, user: '设计师小陈', content: '配色很有创意', time: '5小时前' },
  ]);

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        {
          id: Date.now(),
          user: currentUser.username,
          content: comment,
          time: '刚刚',
        },
        ...comments,
      ]);
      setComment('');
    }
  };

  return (
    <div style={styles.container}>
      {/* 顶部导航 */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <button
            onClick={onBack}
            style={{
              ...styles.buttonSecondary,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <ArrowLeft size={16} />
            返回
          </button>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>作品详情</h1>
          <div></div>
        </div>
      </nav>

      {/* 内容区 */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 400px' : '1fr',
          gap: '24px',
        }}
      >
        {/* 左侧 - 图片 */}
        <div>
          <img
            src={image.imageUrl}
            alt={image.title}
            style={{
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          />
        </div>

        {/* 右侧 - 信息 */}
        <div>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '16px',
              }}
            >
              {image.title}
            </h2>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
                paddingBottom: '24px',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <User size={24} />
              </div>
              <div>
                <p style={{ fontWeight: '600' }}>{image.author}</p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>创作者</p>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '12px',
                }}
              >
                作品信息
              </h3>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ color: '#6b7280' }}>AI模型</span>
                  <span style={{ fontWeight: '500' }}>{image.aiModel}</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ color: '#6b7280' }}>创建时间</span>
                  <span style={{ fontWeight: '500' }}>
                    {new Date(image.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ color: '#6b7280' }}>浏览量</span>
                  <span style={{ fontWeight: '500' }}>{image.views}</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ color: '#6b7280' }}>点赞数</span>
                  <span style={{ fontWeight: '500' }}>{image.likes}</span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '12px',
                }}
              >
                标签
              </h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {image.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '4px 12px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#374151',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ ...styles.button, flex: 1 }}>
                <Heart size={16} />
                点赞
              </button>
              <button style={{ ...styles.buttonSecondary, flex: 1 }}>
                <Bookmark size={16} />
                收藏
              </button>
            </div>
          </div>

          {/* 评论区 */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginTop: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <MessageCircle size={20} />
              评论 ({comments.length})
            </h3>

            <form onSubmit={handleComment} style={{ marginBottom: '16px' }}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="写下你的评论..."
                style={{
                  ...styles.input,
                  minHeight: '80px',
                  resize: 'vertical',
                  marginBottom: '8px',
                }}
              />
              <button type="submit" style={styles.button}>
                发表评论
              </button>
            </form>

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    paddingBottom: '16px',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ fontWeight: '600' }}>{comment.user}</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      {comment.time}
                    </span>
                  </div>
                  <p style={{ color: '#374151' }}>{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 主应用组件
function App() {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentView('gallery');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setCurrentView('detail');
  };

  const handleBack = () => {
    setCurrentView('gallery');
    setSelectedImage(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {currentView === 'login' && <LoginView onLogin={handleLogin} />}
      {currentView === 'gallery' && (
        <GalleryView
          onImageClick={handleImageClick}
          onLogout={handleLogout}
          currentUser={currentUser}
        />
      )}
      {currentView === 'detail' && selectedImage && (
        <ImageDetailView
          image={selectedImage}
          onBack={handleBack}
          currentUser={currentUser}
        />
      )}
    </UserContext.Provider>
  );
}

export default App;
