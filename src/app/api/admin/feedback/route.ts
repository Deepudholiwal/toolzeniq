import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const FEEDBACK_FILE = path.join(process.cwd(), 'data', 'feedback.json');

interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  tool?: string;
  createdAt: string;
  read: boolean;
}

// Helper function to read feedback from file
function readFeedback(): Feedback[] {
  try {
    if (!fs.existsSync(FEEDBACK_FILE)) {
      return [];
    }
    const data = fs.readFileSync(FEEDBACK_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading feedback:', error);
    return [];
  }
}

// Helper function to write feedback to file
function writeFeedback(feedback: Feedback[]): void {
  try {
    const dir = path.dirname(FEEDBACK_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));
  } catch (error) {
    console.error('Error writing feedback:', error);
    throw error;
  }
}

// GET /api/admin/feedback - Get all feedback
export async function GET() {
  try {
    const feedback = readFeedback();
    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}

// POST /api/admin/feedback - Create new feedback (for public feedback form)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, rating, tool } = body;

    if (!name || !email || !message || rating === undefined) {
      return NextResponse.json(
        { error: 'Name, email, message, and rating are required' },
        { status: 400 }
      );
    }

    const feedback = readFeedback();

    const newFeedback: Feedback = {
      id: Date.now().toString(),
      name,
      email,
      message,
      rating: Math.max(1, Math.min(5, rating)), // Ensure rating is between 1-5
      tool: tool || undefined,
      createdAt: new Date().toISOString(),
      read: false,
    };

    feedback.push(newFeedback);
    writeFeedback(feedback);

    return NextResponse.json(newFeedback, { status: 201 });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return NextResponse.json({ error: 'Failed to create feedback' }, { status: 500 });
  }
}