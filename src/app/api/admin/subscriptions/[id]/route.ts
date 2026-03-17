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

// GET /api/admin/subscriptions/[id] - Get a specific subscription
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subscriptions = readSubscriptions();
    const subscription = subscriptions.find(s => s.id === params.id);

    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
  }
}

// PATCH /api/admin/subscriptions/[id] - Update subscription (activate/deactivate)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const subscriptions = readSubscriptions();
    const subscriptionIndex = subscriptions.findIndex(s => s.id === params.id);

    if (subscriptionIndex === -1) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    const updatedSubscription = {
      ...subscriptions[subscriptionIndex],
      ...body,
    };

    subscriptions[subscriptionIndex] = updatedSubscription;
    writeSubscriptions(subscriptions);

    return NextResponse.json(updatedSubscription);
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
  }
}

// DELETE /api/admin/subscriptions/[id] - Delete subscription
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subscriptions = readSubscriptions();
    const subscriptionIndex = subscriptions.findIndex(s => s.id === params.id);

    if (subscriptionIndex === -1) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    subscriptions.splice(subscriptionIndex, 1);
    writeSubscriptions(subscriptions);

    return NextResponse.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    return NextResponse.json({ error: 'Failed to delete subscription' }, { status: 500 });
  }
}