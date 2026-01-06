# frozen_string_literal: true

class Application < ApplicationRecord
enum :status, {
    draft: "draft",
    applied: "applied",
    interview: "interview",
    offer: "offer",
    rejected: "rejected",
    withdrawn: "withdrawn"
  }

  attribute :status, :string, default: "applied"

  validates :company_name, :role_title, :status, :applied_on, presence: true
  validates :status, inclusion: { in: statuses.keys.map(&:to_s) }

  validates :contact_email,
            format: { with: URI::MailTo::EMAIL_REGEXP },
            allow_blank: true

  validates :job_url,
            format: { with: URI::DEFAULT_PARSER.make_regexp(%w[http https]) },
            allow_blank: true

  validate :follow_up_on_not_before_applied_on
  validate :last_followed_up_on_not_before_applied_on
  validate :last_followed_up_on_not_in_future

  private

  def follow_up_on_not_before_applied_on
    return if follow_up_on.blank? || applied_on.blank?
    return unless follow_up_on < applied_on

    errors.add(:follow_up_on, "must be on or after applied_on")
  end

  def last_followed_up_on_not_before_applied_on
    return if last_followed_up_on.blank? || applied_on.blank?
    return unless last_followed_up_on < applied_on

    errors.add(:last_followed_up_on, "must be on or after applied_on")
  end

  def last_followed_up_on_not_in_future
    return if last_followed_up_on.blank?
    return unless last_followed_up_on > Date.current

    errors.add(:last_followed_up_on, "cannot be in the future")
  end
end
