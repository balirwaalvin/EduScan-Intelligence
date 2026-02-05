import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/lib/services/user.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    const role = searchParams.get('role');
    const action = searchParams.get('action');

    // Get user statistics
    if (action === 'stats') {
      const result = await userService.getUserStats(organizationId || undefined);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }
      return NextResponse.json(result.stats);
    }

    // Get all users
    const result = await userService.getAllUsers(
      organizationId || undefined,
      role || undefined
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ users: result.users });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await userService.createUser(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ user: result.user }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, currentPassword, newPassword, ...updates } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Filter out password fields from database updates
    // Passwords are handled via Appwrite authentication API, not database
    console.log('Updating user:', userId);
    console.log('Updates (excluding passwords):', updates);

    // Add updatedAt timestamp
    const dbUpdates = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    // Update user document in database (without password fields)
    const result = await userService.updateUser(userId, dbUpdates);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // TODO: Handle password change via Appwrite Account API if needed
    // This would require the user to be authenticated and use account.updatePassword()
    // For now, we skip password updates as they need special handling

    if (newPassword) {
      console.log('Note: Password update requested but not implemented yet');
      console.log('Password changes should be handled via Appwrite Account API');
    }

    return NextResponse.json({ user: result.user });
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const result = await userService.deleteUser(userId);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
