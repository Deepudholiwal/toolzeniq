import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOGS_FILE = path.join(process.cwd(), 'data', 'blogs.json');

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Helper function to read blogs from file
function readBlogs(): Blog[] {
  try {
    if (!fs.existsSync(BLOGS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(BLOGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

// Helper function to write blogs to file
function writeBlogs(blogs: Blog[]): void {
  try {
    const dir = path.dirname(BLOGS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
  } catch (error) {
    console.error('Error writing blogs:', error);
    throw error;
  }
}

// GET /api/admin/blogs/[id] - Get a specific blog
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogs = readBlogs();
    const blog = blogs.find(b => b.id === params.id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

// PUT /api/admin/blogs/[id] - Update a blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, author, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    const blogs = readBlogs();
    const blogIndex = blogs.findIndex(b => b.id === params.id);

    if (blogIndex === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Check if slug already exists (excluding current blog)
    if (blogs.some(blog => blog.slug === slug && blog.id !== params.id)) {
      return NextResponse.json(
        { error: 'Blog with this slug already exists' },
        { status: 400 }
      );
    }

    const updatedBlog: Blog = {
      ...blogs[blogIndex],
      title,
      slug,
      excerpt: excerpt || '',
      content,
      author: author || blogs[blogIndex].author,
      published: published !== undefined ? published : blogs[blogIndex].published,
      updatedAt: new Date().toISOString(),
    };

    blogs[blogIndex] = updatedBlog;
    writeBlogs(blogs);

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// PATCH /api/admin/blogs/[id] - Partially update a blog (for publish/unpublish)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const blogs = readBlogs();
    const blogIndex = blogs.findIndex(b => b.id === params.id);

    if (blogIndex === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    const updatedBlog = {
      ...blogs[blogIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    blogs[blogIndex] = updatedBlog;
    writeBlogs(blogs);

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

// DELETE /api/admin/blogs/[id] - Delete a blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogs = readBlogs();
    const blogIndex = blogs.findIndex(b => b.id === params.id);

    if (blogIndex === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    blogs.splice(blogIndex, 1);
    writeBlogs(blogs);

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}