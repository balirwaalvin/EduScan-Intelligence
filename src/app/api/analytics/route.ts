import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/services/analytics.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    const action = searchParams.get('action');

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Organization ID is required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'summary':
        const summaryResult = await analyticsService.getDashboardSummary(organizationId);
        if (!summaryResult.success) {
          return NextResponse.json({ error: summaryResult.error }, { status: 500 });
        }
        return NextResponse.json(summaryResult.summary);

      case 'weekly':
        const weeklyResult = await analyticsService.getWeeklyAttendance(organizationId);
        if (!weeklyResult.success) {
          return NextResponse.json({ error: weeklyResult.error }, { status: 500 });
        }
        return NextResponse.json({ data: weeklyResult.data });

      case 'methods':
        const methodsResult = await analyticsService.getMethodDistribution(organizationId);
        if (!methodsResult.success) {
          return NextResponse.json({ error: methodsResult.error }, { status: 500 });
        }
        return NextResponse.json({ data: methodsResult.data });

      case 'stats':
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const statsResult = await analyticsService.getAttendanceStats(
          organizationId,
          startDate ? new Date(startDate) : undefined,
          endDate ? new Date(endDate) : undefined
        );
        if (!statsResult.success) {
          return NextResponse.json({ error: statsResult.error }, { status: 500 });
        }
        return NextResponse.json(statsResult.stats);

      default:
        return NextResponse.json(
          { error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
