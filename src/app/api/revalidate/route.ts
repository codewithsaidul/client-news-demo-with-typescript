// app/api/revalidate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// এই API রুটটি নির্দিষ্ট পেজকে রি-ভ্যালিডেট করার জন্য
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-vercel-reval-secret');

  // আপনার সেট করা গোপন টোকেনটি সঠিক কিনা তা পরীক্ষা করুন
  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  // কোন পেজটি রি-ভ্যালিডেট করতে হবে, তা রিকোয়েস্ট বডি থেকে নিন
  const body = await request.json();
  const path = body.path;

  if (!path) {
    return NextResponse.json({ message: 'Path is required' }, { status: 400 });
  }

  try {
    // Next.js-কে বলুন এই পেজটি নতুন করে তৈরি করতে
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json({ message: 'Error revalidating', error: (error as Error).message }, { status: 500 });
  }
}