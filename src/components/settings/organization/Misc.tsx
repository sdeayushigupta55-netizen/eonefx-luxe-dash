import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Misc() {
  return (
    <div className="bg-[#1c1f24] text-white p-6 rounded-lg border border-gray-700 space-y-6">

      {/* Disclaimer */}
      <div>
        <label className="text-sm font-medium mb-1 flex items-center gap-1">
          Disclaimer
          <span className="text-gray-400 text-xs">ⓘ</span>
        </label>

        {/* RICH TEXT TOOLBAR */}
        <div className="border border-gray-700 rounded-md bg-[#111418] p-2 flex flex-wrap gap-2 text-sm">
          <button className="px-2 py-1 border border-gray-600 rounded">✂</button>
          <button className="px-2 py-1 border border-gray-600 rounded">B</button>
          <button className="px-2 py-1 border border-gray-600 rounded italic">I</button>
          <button className="px-2 py-1 border border-gray-600 rounded">U</button>
          <select className="bg-transparent border border-gray-600 rounded px-2 py-1">
            <option>16</option>
            <option>18</option>
            <option>20</option>
          </select>
          <button className="px-2 py-1 border border-gray-600 rounded bg-yellow-400 text-black">A</button>
          <button className="px-2 py-1 border border-gray-600 rounded">• List</button>
          <button className="px-2 py-1 border border-gray-600 rounded">1. List</button>
          <button className="px-2 py-1 border border-gray-600 rounded">↔</button>
          <button className="px-2 py-1 border border-gray-600 rounded">Img</button>
          <button className="px-2 py-1 border border-gray-600 rounded">🔗</button>
          <button className="px-2 py-1 border border-gray-600 rounded">💻</button>
          <button className="px-2 py-1 border border-gray-600 rounded">?</button>
        </div>

        {/* EDITOR BOX */}
        <div className="border border-gray-700 rounded-md p-3 bg-[#111418] mt-2">
          <Textarea
            rows={6}
            defaultValue={
              "This CRM demo is provided for informational purposes only. All data and functionality presented are for demonstration use and may not reflect actual performance, accuracy, or reliability. Brokeret disclaims any liability for actions taken based on the information displayed in this demo."
            }
            className="bg-transparent border-none text-gray-300 resize-none focus-visible:ring-0"
          />
        </div>
      </div>

      {/* Risk Warning */}
      <div>
        <label className="text-sm font-medium mb-1 flex items-center gap-1">
          Risk Warning
          <span className="text-gray-400 text-xs">ⓘ</span>
        </label>

        <Input
          defaultValue="Trading in forex and other financial instruments carries a high level of risk and may not be suitable for all investors. Demo results may not be reflective of actual market conditions."
          className="bg-[#111418] border-gray-700 text-gray-300"
        />
      </div>

      {/* Footer */}
      <div>
        <label className="text-sm font-medium mb-1 flex items-center gap-1">
          Footer
          <span className="text-gray-400 text-xs">ⓘ</span>
        </label>

        <Input
          defaultValue="© 2024 - 2025 Your Broker"
          className="bg-[#111418] border-gray-700 text-gray-300"
        />
      </div>

      {/* Save Button */}
      <Button className="bg-primary hover:bg-blue-500">Save Changes</Button>
    </div>
  );
}
