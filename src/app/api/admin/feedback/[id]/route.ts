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

// GET /api/admin/feedback/[id] - Get a specific feedback
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const feedback = readFeedback();
    const item = feedback.find(f => f.id === params.id);

    if (!item) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json({ error: 'Failed to fetch feedback' }, { status: 500 });
  }
}

// PATCH /api/admin/feedback/[id] - Update feedback (mark as read/unread)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const feedback = readFeedback();
    const feedbackIndex = feedback.findIndex(f => f.id === params.id);

    if (feedbackIndex === -1) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    const updatedFeedback = {
      ...feedback[feedbackIndex],
      ...body,
    };

    feedback[feedbackIndex] = updatedFeedback;
    writeFeedback(feedback);

    return NextResponse.json(updatedFeedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
  }
}

// DELETE /api/admin/feedback/[id] - Delete feedback
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const feedback = readFeedback();
    const feedbackIndex = feedback.findIndex(f => f.id === params.id);

    if (feedbackIndex === -1) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    feedback.splice(feedbackIndex, 1);
    writeFeedback(feedback);

    return NextResponse.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return NextResponse.json({ error: 'Failed to delete feedback' }, { status: 500 });
  }
}