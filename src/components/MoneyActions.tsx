import { useState } from "react";
import { Plus, DollarSign, Download, Upload, Clock, Users, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MoneyActionsProps {
  onSendMoney: (amount: number) => void;
  onRequestMoney: (amount: number) => void;
  onRecurringPayment: (amount: number, frequency: string) => void;
  onSplitBill: (amount: number, people: number) => void;
}

const MoneyActions = ({ onSendMoney, onRequestMoney, onRecurringPayment, onSplitBill }: MoneyActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Modal states
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isRecurringModalOpen, setIsRecurringModalOpen] = useState(false);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);

  // Form states
  const [sendAmount, setSendAmount] = useState("");
  const [requestAmount, setRequestAmount] = useState("");
  const [recurringAmount, setRecurringAmount] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [splitAmount, setSplitAmount] = useState("");
  const [peopleCount, setPeopleCount] = useState("2");

  const handleSendMoney = () => {
    const numAmount = parseFloat(sendAmount);
    if (numAmount > 0) {
      onSendMoney(numAmount);
      setSendAmount("");
      setIsSendModalOpen(false);
    }
  };

  const handleRequestMoney = () => {
    const numAmount = parseFloat(requestAmount);
    if (numAmount > 0) {
      onRequestMoney(numAmount);
      setRequestAmount("");
      setIsRequestModalOpen(false);
    }
  };

  const handleRecurringPayment = () => {
    const numAmount = parseFloat(recurringAmount);
    if (numAmount > 0) {
      onRecurringPayment(numAmount, frequency);
      setRecurringAmount("");
      setFrequency("weekly");
      setIsRecurringModalOpen(false);
    }
  };

  const handleSplitBill = () => {
    const numAmount = parseFloat(splitAmount);
    const numPeople = parseInt(peopleCount);
    if (numAmount > 0 && numPeople > 1) {
      onSplitBill(numAmount, numPeople);
      setSplitAmount("");
      setPeopleCount("2");
      setIsSplitModalOpen(false);
    }
  };

  const openAction = (action: 'send' | 'request' | 'recurring' | 'split') => {
    setIsOpen(false);
    switch (action) {
      case 'send':
        setIsSendModalOpen(true);
        break;
      case 'request':
        setIsRequestModalOpen(true);
        break;
      case 'recurring':
        setIsRecurringModalOpen(true);
        break;
      case 'split':
        setIsSplitModalOpen(true);
        break;
    }
  };

  return (
    <div className="relative">
      {/* Main Menu */}
      {isOpen && (
        <div className="absolute bottom-12 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-1 md:p-2 min-w-[160px] md:min-w-[180px] z-50">
          <button
            onClick={() => openAction('send')}
            className="w-full flex items-center space-x-2 px-2 md:px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
          >
            <Upload className="h-4 w-4 text-green-500" />
            <span className="text-xs md:text-sm">Send Money</span>
          </button>
          <button
            onClick={() => openAction('request')}
            className="w-full flex items-center space-x-2 px-2 md:px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
          >
            <Download className="h-4 w-4 text-blue-500" />
            <span className="text-xs md:text-sm">Request Money</span>
          </button>
          <button
            onClick={() => openAction('recurring')}
            className="w-full flex items-center space-x-2 px-2 md:px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
          >
            <Clock className="h-4 w-4 text-purple-500" />
            <span className="text-xs md:text-sm">Recurring Payment</span>
          </button>
          <button
            onClick={() => openAction('split')}
            className="w-full flex items-center space-x-2 px-2 md:px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
          >
            <Users className="h-4 w-4 text-orange-500" />
            <span className="text-xs md:text-sm">Split Bill</span>
          </button>
        </div>
      )}

      {/* + Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200 flex items-center justify-center min-w-[40px]"
      >
        <Plus className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
      </button>

      {/* Send Money Modal */}
      <Dialog open={isSendModalOpen} onOpenChange={setIsSendModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Upload className="h-5 w-5 text-green-600" />
              </div>
              Send Money
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Send WLD tokens to another user instantly
            </p>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="send-amount" className="text-sm font-medium">Amount</Label>
              <div className="relative">
                <Input
                  id="send-amount"
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="text-lg h-12 pr-16 focus:ring-green-500 focus:border-green-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">WLD</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleSendMoney} 
              className="w-full h-12 text-base bg-green-500 hover:bg-green-600" 
              disabled={!sendAmount || parseFloat(sendAmount) <= 0}
            >
              <Upload className="w-4 h-4 mr-2" />
              Send Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request Money Modal */}
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Download className="h-5 w-5 text-blue-600" />
              </div>
              Request Money
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Request WLD tokens from another user
            </p>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="request-amount" className="text-sm font-medium">Amount</Label>
              <div className="relative">
                <Input
                  id="request-amount"
                  type="number"
                  value={requestAmount}
                  onChange={(e) => setRequestAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="text-lg h-12 pr-16 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">WLD</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleRequestMoney} 
              className="w-full h-12 text-base bg-blue-500 hover:bg-blue-600" 
              disabled={!requestAmount || parseFloat(requestAmount) <= 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Request Money
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recurring Payment Modal */}
      <Dialog open={isRecurringModalOpen} onOpenChange={setIsRecurringModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              Recurring Payment
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Set up automatic payments on a schedule
            </p>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="recurring-amount" className="text-sm font-medium">Amount</Label>
              <div className="relative">
                <Input
                  id="recurring-amount"
                  type="number"
                  value={recurringAmount}
                  onChange={(e) => setRecurringAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="text-lg h-12 pr-16 focus:ring-purple-500 focus:border-purple-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">WLD</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency" className="text-sm font-medium">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="h-12 focus:ring-purple-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {recurringAmount && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-purple-800">
                    {parseFloat(recurringAmount)} WLD will be sent {frequency}
                  </span>
                </div>
              </div>
            )}
            <Button 
              onClick={handleRecurringPayment} 
              className="w-full h-12 text-base bg-purple-500 hover:bg-purple-600" 
              disabled={!recurringAmount || parseFloat(recurringAmount) <= 0}
            >
              <Clock className="w-4 h-4 mr-2" />
              Setup Recurring Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Split Bill Modal */}
      <Dialog open={isSplitModalOpen} onOpenChange={setIsSplitModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
                     <DialogHeader>
             <DialogTitle className="flex items-center text-lg">
               <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                 <Users className="h-5 w-5 text-orange-600" />
               </div>
               Split Bill
             </DialogTitle>
             <p className="text-sm text-muted-foreground">
               Request payment from people for their share of a bill you paid
             </p>
           </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="split-amount" className="text-sm font-medium">Total Amount</Label>
              <div className="relative">
                <Input
                  id="split-amount"
                  type="number"
                  value={splitAmount}
                  onChange={(e) => setSplitAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="text-lg h-12 pr-16 focus:ring-orange-500 focus:border-orange-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">WLD</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="people-count" className="text-sm font-medium">Number of People</Label>
              <Input
                id="people-count"
                type="number"
                value={peopleCount}
                onChange={(e) => setPeopleCount(e.target.value)}
                min="2"
                className="text-lg h-12 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
                         {splitAmount && peopleCount && parseFloat(splitAmount) > 0 && parseInt(peopleCount) > 1 && (
               <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-2">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center">
                     <DollarSign className="w-4 h-4 text-orange-600 mr-2" />
                     <span className="text-sm font-medium text-orange-800">You paid:</span>
                   </div>
                   <span className="text-lg font-bold text-orange-800">
                     {parseFloat(splitAmount)} WLD for {peopleCount} people
                   </span>
                 </div>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center">
                     <Users className="w-4 h-4 text-orange-600 mr-2" />
                     <span className="text-sm font-medium text-orange-800">Each person owes you:</span>
                   </div>
                   <span className="text-lg font-bold text-orange-800">
                     {(parseFloat(splitAmount) / parseInt(peopleCount)).toFixed(2)} WLD back
                   </span>
                 </div>
               </div>
             )}
                         <Button 
               onClick={handleSplitBill} 
               className="w-full h-12 text-base bg-orange-500 hover:bg-orange-600" 
               disabled={!splitAmount || parseFloat(splitAmount) <= 0 || parseInt(peopleCount) < 2}
             >
               <Users className="w-4 h-4 mr-2" />
               Request Split Payment
             </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoneyActions;
