-- Add payment and request status columns to messages table
ALTER TABLE messages ADD COLUMN payment_status TEXT;
ALTER TABLE messages ADD COLUMN request_status TEXT;

-- Update existing payment messages to have default status
UPDATE messages SET payment_status = 'success' WHERE type = 'send_payment';
UPDATE messages SET request_status = 'pending' WHERE type = 'request_payment'; 