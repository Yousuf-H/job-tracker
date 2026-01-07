# frozen_string_literal: true

class ApplicationsController < ApplicationController
  RESPONSE_KEYS = [
    :id, :company_name, :role_title, :status,
    :applied_on, :follow_up_on, :last_followed_up_on,
    :job_url, :contact_email, :salary, :next_action, :notes,
    :created_at, :updated_at
  ].freeze

  def index
    applications = Application.order(applied_on: :desc, created_at: :desc)
    render json: applications.as_json(only: RESPONSE_KEYS)
  end

  def show
    application = Application.find_by(id: params[:id])
    return render_not_found if application.nil?

    render json: application.as_json(only: RESPONSE_KEYS)
  end

  def create
    application = Application.new(application_params)

    if application.save
      render json: application.as_json(only: RESPONSE_KEYS), status: :created
    else
      render_validation_failed(application)
    end
  end

  def update
    application = Application.find_by(id: params[:id])
    return render_not_found if application.nil?

    if application.update(application_params)
      render json: application.as_json(only: RESPONSE_KEYS)
    else
      render_validation_failed(application)
    end
  end

  def destroy
    application = Application.find_by(id: params[:id])
    return render_not_found if application.nil?

    application.destroy!
    head :no_content
  end

  private

  def application_params
    params.permit(
      :company_name, :role_title, :status,
      :applied_on, :follow_up_on, :last_followed_up_on,
      :job_url, :contact_email, :salary, :next_action, :notes
    )
  end

  def render_not_found
    render json: { error: "not_found" }, status: :not_found
  end

  def render_validation_failed(record)
    render json: { error: "validation_failed", details: record.errors.to_hash },
           status: :unprocessable_entity
  end
end
