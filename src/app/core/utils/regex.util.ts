export class RegexClass {
  public static readonly ONLY_TEXT = /^[a-zA-Z\ñÀ-ú ]{2,20}$/;
  public static readonly PHONE_NUMBER = /^[0-9]{10,12}$/;
  public static readonly CP = /^[0-9]{5}$/;
  public static readonly STREET = /^[a-zA-Z0-9\ñÀ-ú ]{2,50}$/;
  public static readonly USER_NAME = /^[a-zA-Z0-9]{8,24}$/;
  public static readonly PASSWORD = /^[a-zA-Z0-9]{8,}$/;
  public static readonly PRICE = /^[0-9]{0,}(\.[0-9]{0,2})?$/;
  public static readonly TEXT_SERVICE = /^[a-zA-Z\ñÀ-ú ]{2,120}$/;
}