package com.mp.Ecommerce_Backend.model;

public class PaymentDetails {

    private String paymentMethod;

    private String status;

    private String paymentId;

    private  String razorpayPaymentLinkId;

    private String razorpayPaymentLinkreferenceId;

    private String razorpayPaymentLinkStatus;

    private String razorpayPaymentId;

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getRazorpayPaymentLinkId() {
        return razorpayPaymentLinkId;
    }

    public void setRazorpayPaymentLinkId(String razorpayPaymentLinkId) {
        this.razorpayPaymentLinkId = razorpayPaymentLinkId;
    }

    public String getRazorpayPaymentLinkreferenceId() {
        return razorpayPaymentLinkreferenceId;
    }

    public void setRazorpayPaymentLinkreferenceId(String razorpayPaymentLinkreferenceId) {
        this.razorpayPaymentLinkreferenceId = razorpayPaymentLinkreferenceId;
    }

    public String getRazorpayPaymentLinkStatus() {
        return razorpayPaymentLinkStatus;
    }

    public void setRazorpayPaymentLinkStatus(String razorpayPaymentLinkStatus) {
        this.razorpayPaymentLinkStatus = razorpayPaymentLinkStatus;
    }

    public String getRazorpayPaymentId() {
        return razorpayPaymentId;
    }

    public void setRazorpayPaymentId(String razorpayPaymentId) {
        this.razorpayPaymentId = razorpayPaymentId;
    }

    public PaymentDetails() {
    }

    public PaymentDetails(String paymentMethod, String status, String paymentId, String razorpayPaymentLinkId, String razorpayPaymentLinkreferenceId, String razorpayPaymentLinkStatus, String razorpayPaymentId) {
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.paymentId = paymentId;
        this.razorpayPaymentLinkId = razorpayPaymentLinkId;
        this.razorpayPaymentLinkreferenceId = razorpayPaymentLinkreferenceId;
        this.razorpayPaymentLinkStatus = razorpayPaymentLinkStatus;
        this.razorpayPaymentId = razorpayPaymentId;
    }
}
