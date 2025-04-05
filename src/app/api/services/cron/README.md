# Google Sheets Cron Endpoint

This endpoint fetches records from MongoDB that need to be updated (`need_update: true`) and sends them to Google Sheets using the `google_sheets.service.ts` service.

## Setup

No environment variables are required as the token is hardcoded in the route file.

## Usage

The endpoint can be triggered by making a GET request to `/api/services/cron` with the token as a query parameter:

```bash
curl -X GET "https://yourdomain.com/api/services/cron?token=hnl"
```

## Setting Up the Cron Job

### Using a Cron Service (recommended)

Use a service like [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs) or [GitHub Actions](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#schedule) to trigger this endpoint at regular intervals.

#### Example with Vercel Cron Jobs

If you're hosting on Vercel, add this to your `vercel.json` file:

```json
{
  "crons": [
    {
      "path": "/api/services/cron?token=hnl",
      "schedule": "0 0 * * *"
    }
  ]
}
```

#### Example with GitHub Actions

Create a `.github/workflows/cron.yml` file:

```yaml
name: Daily Update to Google Sheets

on:
  schedule:
    - cron: '0 0 * * *'  # Run daily at midnight

jobs:
  update-sheets:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Cron Endpoint
        run: |
          curl -X GET "${{ secrets.APP_URL }}/api/services/cron?token=hnl"
```

## Response

The endpoint returns a JSON response with:

- `success`: Boolean indicating if the operation was successful
- `message`: Human-readable description of the result
- `count`: Number of records processed
- `googleSheetsResponse`: Response from the Google Sheets API (if successful)

## Error Handling

If the operation fails, the response will include an `error` field with details about what went wrong. 