import { NextResponse } from 'next/server';

const BASE_URL = 'https://ecommerce.routemisr.com';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  console.log('[Addresses GET] Token:', token?.substring(0, 20) + '...');
  console.log('[Addresses GET] Auth Header:', authHeader);
  
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch(`${BASE_URL}/api/v1/addresses`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('[Addresses GET] Response:', response.status, data);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.log('[Addresses GET] Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  
  console.log('[Addresses POST] Token:', token?.substring(0, 20) + '...');
  
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log('[Addresses POST] Body:', body);
    
    const response = await fetch(`${BASE_URL}/api/v1/addresses`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('[Addresses POST] Response:', response.status, data);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.log('[Addresses POST] Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

