import React from 'react';
import { FaPrint } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

// function PrintButton({ printRef }) { // Receive the ref as a prop

    function handlePrint(elementId) {
        const printContent = document.getElementById(elementId);
        const printWindow = window.open('', '_blank', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    
        // Optional: Add some basic styling to the new window
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write('<style>body { font-family: Arial, sans-serif; }</style>');
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
    
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    }

export default handlePrint;
