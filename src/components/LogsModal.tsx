import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Trash2, Copy, Eye } from 'lucide-react';

interface LogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: string[];
  onClearLogs: () => void;
}

export const LogsModal: React.FC<LogsModalProps> = ({ isOpen, onClose, logs, onClearLogs }) => {
  const copyLogsToClipboard = () => {
    navigator.clipboard.writeText(logs.join('\n'));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                API Logs
              </DialogTitle>
              <DialogDescription>
                Real-time API call logs and responses
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {logs.length} entries
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={copyLogsToClipboard}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearLogs}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="px-6 pb-6">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="p-4 space-y-2">
                  {logs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No logs yet. API calls will appear here.
                    </div>
                  ) : (
                    logs.map((log, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 rounded-lg border text-sm font-mono"
                      >
                        <div className="flex items-start gap-2">
                          <div className="text-gray-500 flex-shrink-0">
                            #{index + 1}
                          </div>
                          <div className="flex-1 whitespace-pre-wrap break-all">
                            {log}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 