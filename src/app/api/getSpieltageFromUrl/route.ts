import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Fetch the HTML content
    const response = await fetch(url);
    const html = await response.text();

    // Load HTML with cheerio
    const $ = cheerio.load(html);

    // Find the select element with name="spieltag"
    const spieltagSelect = $('select[name="spieltag"]');

    // Build the spieltage map from the options
    const spieltage: Record<string, string> = {};
    spieltagSelect.find('option').each((_, element) => {
      const value = $(element).attr('value')?.trim();
      const href = $(element).attr('data-href')?.trim();
      if (value && href) {
        spieltage[value] = href;
      }
    });


    return NextResponse.json({
      spieltage
    });
  } catch (error) {
    console.error('Error processing URL:', error);
    return NextResponse.json({ error: 'Failed to process URL' }, { status: 500 });
  }
}