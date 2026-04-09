import { NextRequest, NextResponse } from 'next/server';
import { programService } from '@/lib/services/program.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');

    console.log('Programs API - organizationId:', organizationId);

    const result = await programService.getAllPrograms(
      organizationId || undefined
    );

    console.log('Programs service result:', result);
    console.log('Number of programs found:', result.programs?.length);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ programs: result.programs });
  } catch (error: any) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await programService.createProgram(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ program: result.program }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { programId, ...updates } = body;

    if (!programId) {
      return NextResponse.json({ error: 'Program ID is required' }, { status: 400 });
    }

    const result = await programService.updateProgram(programId, updates);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ program: result.program });
  } catch (error: any) {
    console.error('Error updating program:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const programId = searchParams.get('programId');

    if (!programId) {
      return NextResponse.json({ error: 'Program ID is required' }, { status: 400 });
    }

    const result = await programService.deleteProgram(programId);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

