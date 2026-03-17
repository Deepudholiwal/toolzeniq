import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SUBSCRIPTIONS_FILE = path.join(process.cwd(), 'data', 'subscriptions.json');

interface Subscription {
  id: string;
  email: string;
  subscribedAt: string;
  source?: string;
  active: boolean;
}

// Helper function to read subscriptions from file
function readSubscriptions(): Subscription[] {
  try {
    if (!fs.existsSync(SUBSCRIPTIONS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(SUBSCRIPTIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading subscriptions:', error);
    return [];
  }
}

// Helper function to write subscriptions to file
function writeSubscriptions(subscriptions: Subscription[]): void {
  try {
    const dir = path.dirname(SUBSCRIPTIONS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions, null, 2));
  } catch (error) {
    console.error('Error writing subscriptions:', error);
    throw error;
  }
}

// GET /api/admin/subscriptions - Get all subscriptions
export async function GET() {
  try {
    const subscriptions = readSubscriptions();
    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
  }
}

// POST /api/admin/subscriptions - Create new subscription (for public subscription form)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const subscriptions = readSubscriptions();

    // Check if email already exists
    if (subscriptions.some(s => s.email === email)) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    const newSubscription: Subscription = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
      source: source || 'Website',
      active: true,
    };

    subscriptions.push(newSubscription);
    writeSubscriptions(subscriptions);

    return NextResponse.json(newSubscription, { status: 201 });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 });
  }
}